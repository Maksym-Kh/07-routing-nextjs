import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

interface Props {
  params: Promise<{ slug: string[] }>;
}

export default async function FilteredNotesPage({ params }: Props) {
  const queryClient = new QueryClient();
  const resolvedParams = await params;
  const tag = resolvedParams.slug[0];

  await queryClient.prefetchQuery({
    queryKey: ["notes", "filter", tag, 1, ""],
    queryFn: () =>
      fetchNotes({
        tag: tag === "all" ? undefined : tag,
        page: 1,
        perPage: 12,
      }),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tagValue={tag} />
    </HydrationBoundary>
  );
}
