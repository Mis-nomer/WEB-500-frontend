import { AxiosRequestConfig } from 'axios'
import inst from '../instance'

export default {
  add: async (url: string, data?: {}, config?: {}) => await inst.post(url, { data, headers: config } as AxiosRequestConfig),
  read: async (url: string, data?: {}, config?: {}) => await inst.get(url, { data, headers: config } as AxiosRequestConfig),
  delete: async (url: string, data?: {}) => await inst.delete(url, { data }),
  update: async (url: string, body: {}, config?: AxiosRequestConfig) => await inst.put(url, body, config),
}
