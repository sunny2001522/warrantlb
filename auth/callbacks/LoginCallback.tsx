import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../AuthContext'

const LOGOUT_IN_PROGRESS = 'imoney_logout_in_progress'
const LOGIN_REDIRECT_PATH = 'imoney_login_redirect_path'

export default function LoginCallback() {
  const navigate = useNavigate()
  const { loginCallback, isAuthenticated, isInitialized } = useAuth()
  const processedRef = useRef(false)
  const [callbackDone, setCallbackDone] = useState(false)

  useEffect(() => {
    // Guard against StrictMode double-mount
    if (processedRef.current) return
    processedRef.current = true

    const handleCallback = async () => {
      if (sessionStorage.getItem(LOGOUT_IN_PROGRESS) === 'true') {
        console.log('[Login] Skipping callback - logout in progress')
        setCallbackDone(true)
        return
      }
      try {
        await loginCallback()
      } catch (err) {
        console.warn('Login callback error (may be stale state):', err)
      }
      setCallbackDone(true)
    }
    handleCallback()
  }, [loginCallback])

  useEffect(() => {
    // Wait for BOTH the callback to finish AND auth state to settle
    if (!callbackDone || !isInitialized) return

    if (isAuthenticated) {
      const redirectPath = JSON.parse(
        localStorage.getItem(LOGIN_REDIRECT_PATH) || '"/"'
      )
      localStorage.removeItem(LOGIN_REDIRECT_PATH)
      navigate(redirectPath, { replace: true })
    } else {
      navigate('/?error=login_failed', { replace: true })
    }
  }, [callbackDone, isInitialized, isAuthenticated, navigate])

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#d4af37] mx-auto mb-4"></div>
        <p className="text-gray-400">登入中...</p>
      </div>
    </div>
  )
}
