'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '../utils/authContext'

const AdminPage = () => {

  const { user } = useUser()
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      router.push('/login')
    } else if (user.role !== 'admin') {
      router.push('/')
    } else {
      setLoading(false)
    }
  }, [user, router])

  if (loading) {
    return <p>Loading...</p>
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Welcome, {user?.username}! You have admin access.</p>
    </div>
  )
}

export default AdminPage
