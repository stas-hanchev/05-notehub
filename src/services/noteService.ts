import axios from "axios";

import type { Note, NoteTag } from "../types/note";

const API_URL = 'https://notehub-public.goit.study/api';
const token = import.meta.env.VITE_NOTEHUB_TOKEN;

const BASE_URL = "https://notehub-public.goit.study/api";
const TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN;
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
    "Content-Type": "application/json",
  },
});

interface FetchNotesResponse {
    notes: Note[];
    totalPages: number;
}

interface NewNote {
    title: string;
    content: string;
    tag: NoteTag;
}

export async function fetchNotes(keyWord: string, page: number, perPage: number): Promise<FetchNotesResponse> {
    const response = await axios.get<FetchNotesResponse>(`${API_URL}/notes`, {
        params: {
            search: keyWord,
            page,
            perPage
        },
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    console.log('fetchNotes', response.data);

    return response.data;
}

// export async function createNote(payload: NewNote): Promise<Note> {
//     console.log('Token: ', token);
//     const response = await axios.post<Note>(`${API_URL}/notes`, {
//         params: {
//             payload
//         },
//         headers: {
//             Authorization: `Bearer ${token}`
//         }
//     });
//     console.log('createNote', response.data);

//     return response.data;
// }

export async function createNote(payload: NewNote): Promise<Note> {
    console.log('Token: ', token);
    const response = await axios.post<Note>(`${API_URL}/notes`, {
        params: {
            payload
        },
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    console.log('createNote', response.data);

    return response.data;
}

export async function deleteNote(id: string): Promise<Note> {
    const response = await axios.delete<Note>(`${API_URL}/notes/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    console.log('deleteNote', response.data);

    return response.data;
}