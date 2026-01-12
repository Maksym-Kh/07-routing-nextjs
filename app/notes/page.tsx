import { fetchNotes } from "@/lib/api";
import { redirect } from "next/navigation";
import { QueryClient } from "@tanstack/react-query";

export default async function NotesPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", 1, ""],
    queryFn: () => fetchNotes({ page: 1, query: "" }),
  });

  return redirect("/notes/filter/all");
}
