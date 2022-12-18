import { AxiosRequestConfig } from 'axios'
import inst from '../api/instance'

export default {
  add: async (url: string, data?: {}, config?: AxiosRequestConfig) => await inst.post(url, data, config),
  read: async (url: string, config?: AxiosRequestConfig) => await inst.get(url, config),
  delete: async (url: string, config?: AxiosRequestConfig) => await inst.delete(url, config),
  update: async (url: string, body: {}, config?: AxiosRequestConfig) => await inst.put(url, body, config),
}
