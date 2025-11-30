import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  login: (email, password) =>
    api.post('/auth/login', { email, password }),
};

export const employeeAPI = {
  getAllEmployees: () => api.get('/employees'),
};

export const shiftAPI = {
  createShift: (employeeId, date, startTime, endTime) =>
    api.post('/shifts', { employeeId, date, startTime, endTime }),
  getShifts: (employeeId = null, date = null) => {
    const params = new URLSearchParams();
    if (employeeId) params.append('employeeId', employeeId);
    if (date) params.append('date', date);
    return api.get(`/shifts?${params.toString()}`);
  },
  deleteShift: (id) => api.delete(`/shifts/${id}`),
};

export default api;