import axios from "axios";
import type { CreateNoteHttpResponse, Note } from "../type/note";

interface NoteHttpResponse{
    notes: Note[];
    totalPages: number;
}




const baseUrl = "https://notehub-public.goit.study/api/notes";

export async function fetchNotes(query: string, page: number): Promise<NoteHttpResponse> {
    const response = await axios.get(baseUrl, {
        params: {
            search: query,
            page: page,
            perPage: 12,
        },
        headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
      },
    }
    )
    return response.data;
}

export async function createNote({ title, content, tag }: CreateNoteHttpResponse): Promise<Note> {
    const createResponse = await axios.post(baseUrl,
        { title, content, tag },
        {
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
            },
        }
    );
    return createResponse.data
}

export async function deleteNote(id: string): Promise<Note> {
    const deleteResponse = await axios.delete(baseUrl + "/" + id, {
         headers: {
                accept: "application/json",
                Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
            },
    })
    return deleteResponse.data;
}