export interface IHabit {
  _id?: number
  email: string
  title: string
  labels: string[]
  description?: {
    maxLength: 300
    type: string
  }
  repeat?: string[]
  streak: string[]
  startDate?: Date
  options?: {
    reminder: boolean
  }
}

export interface IUser {
  avatar?: string
  name?: string
  password?: string
  email?: string
  isAdmin?: boolean
  token?: string
  isLoggedIn?: {
    type: boolean
    default: false
  }
}
