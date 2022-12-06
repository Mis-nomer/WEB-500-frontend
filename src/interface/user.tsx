export interface IUser {
  username: {
    type: string
    maxLength: 100
  }
  email: string
  token: string
}
