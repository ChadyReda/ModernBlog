import bcrypt from 'bcryptjs'

interface User {
  id: string
  username: string
  password: string
  role: string
}

const users: User[] = []

export const findUserByUsername = (username: string) => users.find(user => user.username === username)

export const createUser = async (username: string, password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10)
  const user: User = {
    id: (users.length + 1).toString(),
    username,
    password: hashedPassword,
    role: 'user'
  }
  users.push(user)
  return user
}
