import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 10)
}

export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword)
}

export const generateToken = (user: { id: string; role: string }): string => {
  return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET as string, {
    expiresIn: '1h',
  })
}

export const verifyToken = (token: string): any => {
  return jwt.verify(token, process.env.JWT_SECRET as string)
}

export function authMiddleware(handler: (req: NextRequest) => any) {
  return (req: NextRequest) => {
    const token = req.headers.get('authorization')?.split(' ')[1]

    if (!token) {
      return NextResponse.json({ error: 'Authentication token required' }, { status: 401 })
    }

    try {
      const user = verifyToken(token)
      ;(req as any).user = user // Add user to req
      return handler(req)
    } catch (error) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 403 })
    }
  }
}
