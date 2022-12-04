export interface IHabit {
  _id?: number
  email: string
  title: string
  labels: string[]
  description: {
    maxLength: 300
    type: string
  }
  repeat: string[]
  streak: Date[]
  startDate: Date
  options: {
    reminder: boolean
  }
}
