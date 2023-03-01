import axios, { AxiosResponse } from 'axios'

const instance = axios.create({
  baseURL: 'https://63e26e4c109336b6cb079437.mockapi.io/api/v1/',
  timeout: 5000,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
})

// * Interceptors
// const ExtractData = async (res: AxiosResponse) => res.data
// instance.interceptors.response.use(ExtractData)

export default instance
