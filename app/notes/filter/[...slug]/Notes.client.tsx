"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import { useEffect, useState } from "react";
import SearchBox from "@/components/SearchBox/SearchBox";
import Modal from "@/components/Modal/Modal";
import { useDebounce } from "use-debounce";
import NoteForm from "@/components/NoteForm/NoteForm";
import css from "./page.module.css";

interface Props {
  tagValue: string;
}

export default function NotesClient({ tagValue }: Props) {
  const [page, setPage] = useState(1);
  const limit = 12;
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 300);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setPage(1);
  }, [tagValue, debouncedSearch]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["notes", "filter", tagValue, page, debouncedSearch],
    queryFn: () =>
      fetchNotes({
        tag: tagValue,
        page,
        perPage: limit,
        query: debouncedSearch,
      }),
  });

  const handleSearchChange = (value: string) => {
    setSearch(value);
  };

  if (isLoading) return <p>Loading notes...</p>;
  if (error) return <p>Error loading notes.</p>;

  return (
    <div className={css.container}>
      <div className={css.search}>
        <div className={css.searchWrapper}>
          <SearchBox value={search} onChange={handleSearchChange} />
        </div>

        <div className={css.paginationBox}>
          {data?.totalPages && data.totalPages > 1 && (
            <Pagination
              totalPages={data.totalPages}
              page={page}
              onPageChange={(p) => setPage(p)}
            />
          )}
        </div>

        <button
          className={css.createButton}
          onClick={() => setIsModalOpen(true)}
        >
          Create note +
        </button>
      </div>

      {data?.notes && data.notes.length > 0 ? (
        <NoteList notes={data.notes} />
      ) : (
        <p className={css.empty}>No notes found.</p>
      )}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onCancel={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}
