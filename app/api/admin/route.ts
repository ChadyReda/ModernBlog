import { NextRequest, NextResponse } from 'next/server'
import { authMiddleware } from '@/app/utils/auth'

const adminHandler = (req: NextRequest) => {
  const user = (req as any).user
  if (user.role !== 'admin') {
    return NextResponse.json({ error: 'Access denied' }, { status: 403 })
  }
  return NextResponse.json({ message: `Welcome to the admin API, ${user.id}!` })
}

export const GET = authMiddleware(adminHandler)
