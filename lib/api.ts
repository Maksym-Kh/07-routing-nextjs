import axios from "axios";
import type { Note } from "@/types/note";

interface noteResponse {
  notes: Note[];
  totalPages: number;
}

interface noteParams {
  pageNumber?: number;
  query?: string;
}

axios.defaults.baseURL = "https://notehub-public.goit.study/api";

const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export const fetchNotes = async ({
  pageNumber,
  query,
}: noteParams): Promise<noteResponse> => {
  const response = await axios.get<noteResponse>("/notes", {
    params: {
      page: pageNumber,
      search: query,
      perPage: 12,
    },
  });
  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const res = await axios.get<Note>(`/notes/${id}`);
  return res.data;
};

interface createNoteProps {
  title: string;
  content: string;
  tag: string;
}

export const createNote = async (noteInfo: createNoteProps): Promise<Note> => {
  const response = await axios.post<Note>("/notes", noteInfo);
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response = await axios.delete<Note>(`/notes/${id}`);
  return response.data;
};
