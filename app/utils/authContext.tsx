"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import jwt from 'jsonwebtoken'

interface User {
  id: string
  role: string
  username?: string
}

interface UserContextType {
  user: User | null
  setUser: (user: User | null) => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

interface UserProviderProps {
  children: ReactNode
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    console.log(token)
    if (token) {
      try {
        const decoded = jwt.decode(token) as User
        console.log(decoded)
        setUser(decoded)
      } catch (error) {
        console.log('Token decoding failed', error)
      }
    }
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = (): UserContextType => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}
