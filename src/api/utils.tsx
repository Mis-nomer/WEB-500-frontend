import { AxiosError } from 'axios'

export function logError(err: AxiosError) {
  let response = err.response
  let specifyMessage = (response?.data as object | string)?.toString()
  let genericMessage = err.message
  return console.error(specifyMessage ?? genericMessage)
}
