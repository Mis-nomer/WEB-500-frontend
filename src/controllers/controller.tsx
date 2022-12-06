import { AxiosRequestConfig } from 'axios'
import inst from '../instance'

export default {
  add: async (url: string, body?: {}) => await inst.post(url, body),
  read: async (url: string, body?: {}) => await inst.get(url, body),
  delete: async (url: string, data?: {}) => await inst.delete(url, { data }),
  update: async (url: string, body: {}, config?: AxiosRequestConfig) => await inst.put(url, body, config),
}
