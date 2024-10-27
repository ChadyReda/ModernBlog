import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { findUserByUsername } from '@/app/utils/users'
import { generateToken } from '@/app/utils/auth'

async function handler(req: NextRequest) {
  const { username, password } = await req.json()
  const user = findUserByUsername(username)

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }

  const token = generateToken(user)
  return NextResponse.json({ token })
}


export {handler as POST}