import inst from "../instance";

const baseURL = "/habit/";

export default {
  add: async (body: {}) => await inst.post(baseURL, body),
  read: async (id?: number) => await inst.get(baseURL + (id || "")),
  delete: async (id: number) => await inst.delete(baseURL + id),
  update: async (id: number, body: {}) => await inst.put(baseURL + id, body),
};
