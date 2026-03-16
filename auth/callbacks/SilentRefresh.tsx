import { useEffect } from 'react'
import { useAuth } from '../AuthContext'

export default function SilentRefresh() {
  const { refreshCallback } = useAuth()

  useEffect(() => {
    const handleRefresh = async () => {
      try {
        await refreshCallback()
      } catch (err) {
        console.error('Silent refresh failed:', err)
      }
    }
    handleRefresh()
  }, [refreshCallback])

  return null
}
