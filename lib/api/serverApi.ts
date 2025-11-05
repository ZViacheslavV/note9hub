/*     fetchNotes
    fetchNoteById
    getMe+
    checkSession+ */

import { cookies } from 'next/headers';
import { API_ENDPOINTS, noteService } from './api';
import { User } from '@/types/user';
import { cleanParams, NotesResponse, PER_PAGE } from './clientApi';
import { Note } from '@/types/note';

export const checkServerSession = async () => {
  const cookieStore = await cookies();
  const res = await noteService.get(`${API_ENDPOINTS.SESSION}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res;
};

export const getServerMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const { data } = await noteService.get(`${API_ENDPOINTS.PROFILE_GET_UPDATE}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return data;
};

export const fetchServerNotes = async (
  search: string,
  tag?: string | undefined,
  page: number = 1,
  perPage: number = PER_PAGE
): Promise<NotesResponse> => {
  const cookieStore = await cookies();
  const params = cleanParams({
    search,
    tag,
    page,
    perPage,
  });

  // console.log(params);

  const { data } = await noteService.get<NotesResponse>(`${API_ENDPOINTS.NOTE_SEARCH_CREATE}`, {
    ...params,
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};

export const fetchServerNoteById = async (noteId: Note['id']) => {
  const cookieStore = await cookies();
  const { data } = await noteService.get<Note>(`${API_ENDPOINTS.NOTE_GET_EDIT_DELETE}${noteId}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};
