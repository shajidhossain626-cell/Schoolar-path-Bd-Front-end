import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
})

// Attach JWT token to every request
api.interceptors.request.use(config => {
  const token = localStorage.getItem('sp_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Handle 401 (expired token) globally
api.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) {
      localStorage.removeItem('sp_token')
      localStorage.removeItem('sp_user')
      window.location.href = '/'
    }
    return Promise.reject(err)
  }
)

// ── Auth ──
export const authAPI = {
  login:   (data) => api.post('/auth/login', data),
  signup:  (data) => api.post('/auth/signup', data),
  me:      ()     => api.get('/auth/me'),
  logout:  ()     => api.post('/auth/logout'),
}

// ── Scholarships ──
export const scholarshipAPI = {
  list:   (params) => api.get('/scholarships', { params }),
  getOne: (id)     => api.get(`/scholarships/${id}`),
  save:   (id)     => api.post(`/scholarships/${id}/save`),
  unsave: (id)     => api.delete(`/scholarships/${id}/save`),
  saved:  ()       => api.get('/scholarships/saved'),
}

// ── Applications ──
export const applicationAPI = {
  list:   ()       => api.get('/applications/me'),
  create: (data)   => api.post('/applications', data),
  update: (id, d)  => api.put(`/applications/${id}`, d),
  delete: (id)     => api.delete(`/applications/${id}`),
}

// ── Documents ──
export const documentAPI = {
  list:   ()       => api.get('/documents/me'),
  upload: (form)   => api.post('/documents/upload', form, { headers: { 'Content-Type': 'multipart/form-data' } }),
  delete: (id)     => api.delete(`/documents/${id}`),
}

// ── Payments ──
export const paymentAPI = {
  initiate: (data) => api.post('/payments/initiate', data),
  history:  ()     => api.get('/payments/me'),
}

// ── AI Advisor ──
export const aiAPI = {
  ask: (question, context = '') => api.post('/ai/ask', { question, context }),
}

// ── Blog ──
export const blogAPI = {
  list:   (params) => api.get('/blogs', { params }),
  getOne: (id)     => api.get(`/blogs/${id}`),
}

// ── Contact ──
export const contactAPI = {
  send: (data) => api.post('/contact', data),
}

export default api
