"use client";

import { fetchNoteById } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import css from "./NotePreview.module.css";
import Modal from "@/components/Modal/Modal";

export default function NotePreview() {
  const router = useRouter();

  const { id } = useParams<{ id: string }>();

  const { data: notes } = useQuery({
    queryKey: ["notes", id],
    queryFn: () => fetchNoteById(id),
  });

  const handleClose = () => {
    router.back();
  };

  return (
    <Modal onClose={handleClose}>
      <button className={css.onCloseBtn} onClick={handleClose}>
        X
      </button>
      <div className={css.container}>
        <h2 className={css.title}>{notes?.title}</h2>
        <p className={css.content}>{notes?.content}</p>
        <div className={css.footer}>
          <span className={css.tag}>{notes?.tag}</span>
        </div>
      </div>
    </Modal>
  );
}
