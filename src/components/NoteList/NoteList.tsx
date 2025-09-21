import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Note } from "../../type/note"
import css from "./NoteList.module.css"
import { deleteNote } from "../../services/noteService";

interface NoteListPrors {
    notes: Note[];
}

export default function NoteList({ notes }: NoteListPrors) {
    
    const queryClient = useQueryClient();

     const mutationPost = useMutation({
        mutationFn: async (id: string) => {
            const res = await deleteNote(id);
            return res;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["notes"]})
        }
     })
    
    const handleDeleteNote = (id:string) => {
        mutationPost.mutate(id)
    }

    return <ul className={css.list}>
        {notes.map((note) => (<li className={css.listItem} key={note.id}>
            <h2 className={css.title}>{note.title}</h2>
            <p className={css.content}>{note.content}</p>
            <div className={css.footer}>
                <span className={css.tag}>{note.tag}</span>
                <button onClick={() => handleDeleteNote(note.id)} className={css.button}>Delete</button>
            </div>
        </li>))}
    </ul>

};