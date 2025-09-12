'use client';

import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import NoteList from '@/components/NoteList/NoteList';
import { fetchNotes } from '@/lib/api';
// import Sidebar from '@/components/Sidebar/Sidebar';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';

export default function NotesPage() {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;

  const { data, isFetching } = useQuery({
    queryKey: ['notes', page],
    queryFn: () => fetchNotes(undefined, page, undefined, undefined),
  });

  const notes = data?.notes ?? [];

  return (
    <div style={{ display: 'flex' }}>
      {/* <Sidebar /> */}
      <main style={{ flex: 1, padding: '1rem' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '1rem' }}>All Notes</h1>
        <SearchBox onChange={() => {}} />
        <NoteList notes={notes} isFetching={isFetching} />
        <Pagination totalPages={1} page={1} setPage={() => {}} />
      </main>
    </div>
  );
}