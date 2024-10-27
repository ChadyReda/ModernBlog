import { NextRequest, NextResponse } from 'next/server'
import { createUser, findUserByUsername } from '@/app/utils/users'

async function handler(req: NextRequest) {
  const { username, password } = await req.json()

  if (findUserByUsername(username)) {
    return NextResponse.json({ error: 'User already exists' }, { status: 400 })
  }

  const user = await createUser(username, password)
  return NextResponse.json({ user })
}

export {handler as POST}