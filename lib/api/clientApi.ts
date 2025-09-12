import axios from 'axios';
import { api } from './api';
import { User } from '@/types/user';
import { Note } from '@/types/note';

export async function createNote(note: { title: string; content: string; tag?: string }): Promise<Note> {
  const { data } = await api.post('/notes', note, { withCredentials: true });
  return data;
}

export const login = async (body: { email: string; password: string }): Promise<User> => {
  const { data } = await api.post('/auth/login', body);
  return data;
};

export const logout = async (): Promise<void> => {
  await api.post('/auth/logout');
};

export const loginUser = async (credentials: { email: string; password: string }): Promise<User> => {
  try {
    const { data } = await api.post('/auth/login', credentials, {
      withCredentials: true,
    });
    return data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 400) {
        throw new Error(error.response?.data?.message || 'Validation failed');
      } else if (error.response?.status === 401) {
        throw new Error('Invalid email or password');
      }
    }
    throw new Error('Login failed');
  }
};

export const register = async (credentials: { email: string; password: string }): Promise<User> => {
  try {
    const { data } = await api.post('/auth/register', credentials, {
      withCredentials: true,
    });
    return data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 400) {
        throw new Error(error.response?.data?.message || 'Validation failed');
      } else {
        throw new Error('Registration failed');
      }
    }
    throw new Error('Registration failed');
  }
};

export const checkSession = async (): Promise<User | null> => {
  try {
    const { data } = await api.get<User | null>('/auth/session', { withCredentials: true });
    return (data as User) ?? null;
  } catch {
    return null;
  }
};

export async function fetchNotes(params: {
  search?: string;
  page?: number;
  perPage?: number;
  tag?: string;
}): Promise<{ notes: Note[]; totalPages: number }> {
  const { data } = await api.get('/notes', { params });
  return data;
}

export async function updateUser(data: { username: string }): Promise<User> {
  const res = await api.patch<User>('/users/me', data, { withCredentials: true });
  return res.data;
}
export async function deleteNote(id: string): Promise<void> {
  await api.delete(`/notes/${id}`, { withCredentials: true });
}