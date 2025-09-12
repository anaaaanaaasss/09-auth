'use server';
import { cookies } from 'next/headers';
import { User } from '@/types/user';
import { Note } from '@/types/note';

export const fetchNoteById = async (id: string): Promise<Note | null> => {
  try {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.getAll().map((c: { name: string; value: string }) => `${c.name}=${c.value}`).join('; ');
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/notes/${id}`, {
      method: 'GET',
      headers: {
        Cookie: cookieHeader,
      },
      cache: 'no-store',
    });
    if (!response.ok) return null;
    return await response.json();
  } catch {
    return null;
  }
};

export const getSession = async (): Promise<User | null> => {
  try {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.getAll().map((c: { name: string; value: string }) => `${c.name}=${c.value}`).join('; ');
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/session`, {
      method: 'GET',
      headers: {
        Cookie: cookieHeader,
      },
      cache: 'no-store',
    });

    if (!response.ok) return null;

    return await response.json();
  } catch {
    return null;
  }
};

export const getProfile = async (): Promise<User | null> => {
  try {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.getAll().map((c: { name: string; value: string }) => `${c.name}=${c.value}`).join('; ');
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/me`, {
      method: 'GET',
      headers: {
        Cookie: cookieHeader,
      },
      cache: 'no-store',
    });

    if (!response.ok) return null;

    return await response.json();
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
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/notes`, {
    method: 'GET',
    headers: {
      Cookie: cookieHeader,
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    return [];
  }

  interface NoteTag {
    tag: string;
  }

  const { notes } = (await response.json()) as { notes: NoteTag[] };
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

    const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/api/notes`);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          url.searchParams.append(key, String(value));
        }
      });
    }

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        Cookie: cookieHeader,
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      return { notes: [], totalPages: 0 };
    }

    return await response.json();
  } catch {
    return { notes: [], totalPages: 0 };
  }
};
