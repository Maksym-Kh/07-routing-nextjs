"use client";

import { fetchNoteById } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import css from "./NotePreview.module.css";
import Modal from "@/components/Modal/Modal";

interface Props {
  id: string;
}

export default function NotePreview({ id }: Props) {
  const router = useRouter();

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error: Could not load the note.</p>;
  }

  const handleClose = () => {
    router.back();
  };

  return (
    <Modal onClose={handleClose}>
      <button className={css.onCloseBtn} onClick={handleClose}>
        X
      </button>
      <div className={css.container}>
        <h2 className={css.title}>{note?.title}</h2>
        <p className={css.content}>{note?.content}</p>
        <div className={css.footer}>
          <span className={css.tag}>{note?.tag}</span>
        </div>
      </div>
    </Modal>
  );
}
