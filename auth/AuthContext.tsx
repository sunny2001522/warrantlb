import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react'
import type { User } from 'oidc-client-ts'
import { getOidcManager } from './oidcConfig'
import { trackLiveLoginAttempt, trackLiveLoginBlocked, trackLiveLoginResult } from '../analytics'

const LOGIN_REDIRECT_PATH = 'imoney_login_redirect_path'
const LOGOUT_REDIRECT_PATH = 'imoney_logout_redirect_path'
const LOGOUT_IN_PROGRESS = 'imoney_logout_in_progress'
const LOGIN_LAST_ATTEMPT_AT = 'imoney_login_last_attempt_at'
const LOGIN_COOLDOWN_MS = 15_000

type LoginErrorCode = 'login_in_progress' | 'login_cooldown' | 'login_redirect_failed'

class LoginFlowError extends Error {
  code: LoginErrorCode
  retryAfterMs?: number

  constructor(code: LoginErrorCode, message: string, retryAfterMs?: number) {
    super(message)
    this.name = 'LoginFlowError'
    this.code = code
    this.retryAfterMs = retryAfterMs
  }
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  isInitialized: boolean
  isLoginInProgress: boolean
  login: (redirectPath?: string) => Promise<void>
  logout: (redirectPath?: string) => Promise<void>
  loginCallback: () => Promise<void>
  logoutCallback: () => Promise<void>
  refreshCallback: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const manager = getOidcManager()

  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isInitialized, setIsInitialized] = useState(false)
  const [isLoginInProgress, setIsLoginInProgress] = useState(false)

  const isAuthenticated = useMemo(() => {
    return !!user && !user.expired && !!user.access_token
  }, [user])

  const clearState = useCallback(() => {
    setUser(null)
    setIsInitialized(false)
    setIsLoginInProgress(false)
  }, [])

  const loadUser = useCallback(async () => {
    setIsLoading(true)
    try {
      const oidcUser = await manager.getUser()
      if (oidcUser && !oidcUser.expired && oidcUser.access_token) {
        setUser(oidcUser)
      } else {
        setUser(null)
      }
      setIsInitialized(true)
    } catch (error) {
      console.error('Failed to get user from OIDC manager:', error)
      setUser(null)
      setIsInitialized(true)
    } finally {
      setIsLoading(false)
    }
  }, [manager])

  const login = useCallback(async (redirectPath: string = '/') => {
    if (isLoginInProgress) {
      trackLiveLoginBlocked('in_progress')
      throw new LoginFlowError('login_in_progress', 'Login is already in progress.')
    }

    const now = Date.now()
    const lastAttemptAt = Number(sessionStorage.getItem(LOGIN_LAST_ATTEMPT_AT) || '0')
    const retryAfterMs = LOGIN_COOLDOWN_MS - (now - lastAttemptAt)

    if (retryAfterMs > 0) {
      trackLiveLoginBlocked('cooldown', Math.ceil(retryAfterMs / 1000))
      throw new LoginFlowError(
        'login_cooldown',
        'Login is temporarily cooling down.',
        retryAfterMs,
      )
    }

    try {
      setIsLoginInProgress(true)
      sessionStorage.setItem(LOGIN_LAST_ATTEMPT_AT, String(now))
      localStorage.setItem(LOGIN_REDIRECT_PATH, JSON.stringify(redirectPath))
      trackLiveLoginAttempt('live_stream_gate')
      await manager.signinRedirect()
    } catch (error) {
      setIsLoginInProgress(false)
      trackLiveLoginResult('failed', error instanceof Error ? error.message : 'signin_redirect_failed')
      console.error('Login failed:', error)
      if (error instanceof LoginFlowError) {
        throw error
      }
      throw new LoginFlowError('login_redirect_failed', 'Login redirect failed.')
    }
  }, [isLoginInProgress, manager])

  const loginCallback = useCallback(async () => {
    try {
      await manager.signinRedirectCallback()
      await manager.clearStaleState()
      setIsLoginInProgress(false)
      sessionStorage.removeItem(LOGIN_LAST_ATTEMPT_AT)
      trackLiveLoginResult('success')
    } catch (error) {
      setIsLoginInProgress(false)
      trackLiveLoginResult('failed', error instanceof Error ? error.message : 'signin_callback_failed')
      console.error('Login callback failed:', error)
      throw error
    }
  }, [manager])

  const logout = useCallback(async (redirectPath: string = '/') => {
    try {
      localStorage.setItem(LOGOUT_REDIRECT_PATH, JSON.stringify(redirectPath))
      sessionStorage.setItem(LOGOUT_IN_PROGRESS, 'true')
      setUser(null)
      await manager.signoutRedirect()
    } catch (error) {
      console.error('Logout failed:', error)
      throw error
    }
  }, [manager])

  const logoutCallback = useCallback(async () => {
    try {
      await manager.signoutRedirectCallback()
      await manager.clearStaleState()
      sessionStorage.removeItem(LOGOUT_IN_PROGRESS)
      clearState()
    } catch (error) {
      console.error('Logout callback failed:', error)
      throw error
    }
  }, [manager, clearState])

  const refreshCallback = useCallback(async () => {
    try {
      await manager.signinSilentCallback()
    } catch (error) {
      console.error('Silent refresh failed:', error)
      throw error
    }
  }, [manager])

  useEffect(() => {
    // Clean up stale OIDC state from previous failed attempts
    manager.clearStaleState().catch(() => {})
    loadUser()

    const handleUserLoaded = (loadedUser: User) => setUser(loadedUser)
    const handleUserUnloaded = () => clearState()
    const handleAccessTokenExpired = () => {
      console.log('[Auth] Access token expired')
      clearState()
    }
    const handleSilentRenewError = (error: Error) => {
      console.error('[Auth] Silent renew error:', error)
      clearState()
    }

    manager.events.addUserLoaded(handleUserLoaded)
    manager.events.addUserUnloaded(handleUserUnloaded)
    manager.events.addAccessTokenExpired(handleAccessTokenExpired)
    manager.events.addSilentRenewError(handleSilentRenewError)

    return () => {
      manager.events.removeUserLoaded(handleUserLoaded)
      manager.events.removeUserUnloaded(handleUserUnloaded)
      manager.events.removeAccessTokenExpired(handleAccessTokenExpired)
      manager.events.removeSilentRenewError(handleSilentRenewError)
    }
  }, [loadUser, manager, clearState])

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      isLoading,
      isInitialized,
      isLoginInProgress,
      login,
      logout,
      loginCallback,
      logoutCallback,
      refreshCallback,
    }}>
      {children}
    </AuthContext.Provider>
  )
}
