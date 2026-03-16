import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
});

// Add a request interceptor to include the auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Auth endpoints
export const loginUser = (data) => api.post('/auth/login', data);
export const signupUser = (data) => api.post('/auth/signup', data);

// Problem endpoints
export const getProblems = (params) => api.get('/problems', { params });
export const getProblem = (id) => api.get(`/problems/${id}`);
export const createProblem = (data) => api.post('/problems', data);

// Answer endpoints
export const getAnswers = (problemId) => api.get(`/answers/${problemId}`);
export const createAnswer = (data) => api.post('/answers', data);

// Vote endpoints
export const voteAnswer = (answerId) => api.post('/vote', { answerId });

// User endpoints
export const getProfile = () => api.get('/users/profile');

export default api;
