'use server';
import { cookies } from 'next/headers';
import { User } from '@/types/user';
import { Note } from '@/types/note';
import { api } from '@/lib/axios';

export const fetchNoteById = async (id: string): Promise<Note | null> => {
  try {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.getAll().map((c: { name: string; value: string }) => `${c.name}=${c.value}`).join('; ');
    const response = await api.get(`/notes/${id}`, {
      headers: { Cookie: cookieHeader },
    });
    return response.data;
  } catch (error: unknown) {
    if ((error as { response?: { status?: number } }).response?.status === 404) {
      return null;
    }
    throw error;
  }
};

import { AxiosResponse } from 'axios';

export const getSession = async (): Promise<AxiosResponse<User> | null> => {
  try {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.getAll().map((c: { name: string; value: string }) => `${c.name}=${c.value}`).join('; ');
    const response = await api.get('/auth/session', {
      headers: { Cookie: cookieHeader },
    });

    if (!response.status || response.status < 200 || response.status >= 300) return null;

    return response;
  } catch {
    return null;
  }
};

export const getProfile = async (): Promise<AxiosResponse<User> | null> => {
  try {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.getAll().map((c: { name: string; value: string }) => `${c.name}=${c.value}`).join('; ');
    const response = await api.get('/users/me', {
      headers: { Cookie: cookieHeader },
    });

    if (!response.status || response.status < 200 || response.status >= 300) return null;

    return response;
  } catch {
    return null;
  }
};

export const getCategories = async (): Promise<string[]> => {
  return [
    'Work',
    'Personal',
    'Meeting',
    'Shopping',
    'Ideas',
    'Travel',
    'Finance',
    'Health',
    'Important',
    'Todo',
  ];
};

export const getTags = async (): Promise<string[]> => {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.getAll().map((c: { name: string; value: string }) => `${c.name}=${c.value}`).join('; ');
  const response = await api.get('/notes', {
    headers: { Cookie: cookieHeader },
  });

  if (!response.status || response.status < 200 || response.status >= 300) {
    return [];
  }

  interface NoteTag {
    tag: string;
  }

  const { notes } = response.data as { notes: NoteTag[] };
  const tags = Array.from(new Set(notes.map((note: NoteTag) => note.tag)));
  return tags;
};

export const getNotes = async (params?: {
  search?: string;
  tag?: string;
  page?: number;
  perPage?: number;
  sortBy?: 'created' | 'updated';
}) => {
  try {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.getAll().map((c: { name: string; value: string }) => `${c.name}=${c.value}`).join('; ');

    const url = '/notes';
    const response = await api.get(url, {
      headers: { Cookie: cookieHeader },
      params,
    });

    if (!response.status || response.status < 200 || response.status >= 300) {
      return { notes: [], totalPages: 0 };
    }

    return response.data;
  } catch {
    return { notes: [], totalPages: 0 };
  }
};
