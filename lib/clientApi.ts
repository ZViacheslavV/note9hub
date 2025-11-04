'udr client';

import { Note } from '@/types/note';
import { User } from '@/types/user';
import { noteService } from './api';

/*     fetchNotes+
    fetchNoteById+
    createNote+
    deleteNote+
    register+
    login+
    logout+
    checkSession+
    getMe+
    updateMe */

export const PER_PAGE = 10;
/* const API_ENDPOINTS = {
  SEARCH: '?search',
}; */

interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

//Function for cleaning objects from null, '', undefined
/* const cleanParams = <T extends Record<string, unknown>>(obj: T): Partial<T> =>
  Object.fromEntries(Object.entries(obj).filter(([, v]) => v != null && v !== '')) as Partial<T>; */
export const cleanParams = <T extends object>(obj: T): Partial<T> =>
  Object.fromEntries(Object.entries(obj).filter(([, v]) => v != null && v !== '')) as Partial<T>;

export const fetchNotes = async (
  search: string,
  tag?: string | undefined,
  page: number = 1,
  perPage: number = PER_PAGE
  /* sortBy: string = '' */
): Promise<NotesResponse> => {
  const params = cleanParams({
    search,
    tag,
    page,
    perPage,
    /* sortBy, */
  });

  // console.log(params);

  const { data } = await noteService.get<NotesResponse>('', { params });

  return data;
};

export const createNote = async (newNote: Pick<Note, 'title' | 'content' | 'tag'>) => {
  const { data } = await noteService.post<Note>('', newNote);
  return data;
};

export const deleteNote = async (noteId: Note['id']) => {
  const { data } = await noteService.delete<Note>(`/${noteId}`);
  return data;
};

export const fetchNoteById = async (noteId: Note['id']) => {
  const { data } = await noteService.get<Note>(`/${noteId}`);
  return data;
};

export interface LogRegRequest {
  email: string;
  password: string;
}

export const register = async (userData: LogRegRequest) => {
  const { data } = await noteService.post<User>('auth/register', userData);
  return data;
};

export const logout = async (): Promise<void> => {
  await noteService.post('/auth/logout');
};

export const login = async (userData: LogRegRequest) => {
  const { data } = await noteService.post<User>('/auth/login', userData);
  return data;
};

interface CheckSessionRequest {
  success: boolean;
}

export const checkSession = async () => {
  const { data } = await noteService.get<CheckSessionRequest>('/auth/session');
  return data.success;
};

export const getMe = async () => {
  const { data } = await noteService.get<User>('/auth/me');
  return data;
};
