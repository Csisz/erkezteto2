import axios from 'axios'

const api = axios.create({ baseURL: '/api' })

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) {
      localStorage.clear()
      window.location.href = '/login'
    }
    return Promise.reject(err)
  }
)

export const authLogin    = (username, password) => api.post('/login', { username, password })
export const postLevel    = (data)               => api.post('/level', data)
export const postPanasz   = (data)               => api.post('/ugyfelpanasz', data)
export const getLevels    = (filters)            => api.post('/getlevel', filters)

export default api
