import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../AuthContext'

const LOGOUT_REDIRECT_PATH = 'imoney_logout_redirect_path'

export default function LogoutCallback() {
  const navigate = useNavigate()
  const { logoutCallback, logout } = useAuth()
  const processedRef = useRef(false)

  useEffect(() => {
    // Guard against StrictMode double-mount
    if (processedRef.current) return
    processedRef.current = true

    const handleCallback = async () => {
      try {
        await logoutCallback()
        const redirectPath = JSON.parse(
          localStorage.getItem(LOGOUT_REDIRECT_PATH) || '"/"'
        )
        localStorage.removeItem(LOGOUT_REDIRECT_PATH)
        navigate(redirectPath, { replace: true })
      } catch (err) {
        console.error('Logout failed:', err)
        await logout('/')
      }
    }
    handleCallback()
  }, [logoutCallback, logout, navigate])

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#d4af37] mx-auto mb-4"></div>
        <p className="text-gray-400">登出中...</p>
      </div>
    </div>
  )
}
