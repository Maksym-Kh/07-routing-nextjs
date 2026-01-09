import { useMutation, useQueryClient } from "@tanstack/react-query";
import css from "./NoteList.module.css";
import { deleteNote } from "@/lib/api";
import type { Note } from "@/types/note";

import Link from "next/link";

interface Props {
  notes: Note[];
}

export default function NoteList({ notes }: Props) {
  const queryClient = useQueryClient();

  const { mutate: mutateDelete } = useMutation({
    mutationKey: ["deleteNote"],
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
    onError: (error) => {
      alert("Error deleting note: " + error.message);
    },
  });

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.listItem}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <Link href={`/notes/${note.id}`}>View details</Link>
            <button
              className={css.button}
              onClick={() => mutateDelete(note.id)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
