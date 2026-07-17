import { api } from './client';

export const AuthService = {
  // Replace with actual identity service endpoints when available
  login: (email: string, password?: string) => api.post<{ message: string, data: { token: string } }>('/api/auth/login', { email, password }),
  register: (data: any) => api.post<{ message: string, data: any }>('/api/auth/register', data),
  getUserProfile: () => api.get<{ message: string, data: any }>('/users/me'),
};
