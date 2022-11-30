import inst from '../instance'

const baseURL = '/habit/'

export default {
  add: async (body: {}) => await inst.post(baseURL, body),
  read: async (body: {}) => await inst.get(baseURL, body),
  delete: async (id: number) => await inst.delete(baseURL + id),
  update: async (id: number, body: {}) => await inst.put(baseURL + id, body),
}
