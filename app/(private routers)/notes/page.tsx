'use client';

import { useQuery } from '@tanstack/react-query';
import { useSearchParams, useRouter } from 'next/navigation';
import NoteList from '@/components/NoteList/NoteList';
import { getNotes } from '@/app/server/serverApi';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';

export default function NotesPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const page = Number(searchParams.get('page')) || 1;

  const { data, isFetching } = useQuery({
    queryKey: ['notes', page],
    queryFn: () => getNotes({ page, perPage: 12 }),
  });

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 1;

  return (
    <main style={{ flex: 1, padding: '1rem' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '1rem' }}>All Notes</h1>
      <SearchBox onChange={() => {}} />
      <NoteList notes={notes} isFetching={isFetching} />
      <Pagination totalPages={totalPages} page={page} setPage={(newPage) => {
        router.push(`?page=${newPage}`);
      }} />
    </main>
  );
}