import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:8000/api',
  timeout: 5000,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
})

async function ExtractData(res: any) {
  res.data = res.data.data
  return res
}

instance.interceptors.response.use(ExtractData)

export default instance
