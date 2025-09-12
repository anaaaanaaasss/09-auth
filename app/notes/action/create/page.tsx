import { Metadata } from 'next';
import NoteFormPage from '@/components/NoteFormPage/NoteFormPage';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Create a new note | NoteHub',
  description: 'Create a new note in your collection',
  openGraph: {
    title: 'Create a new note | NoteHub',
    description: 'Create a new note in your collection',
    url: 'https://08-zustand-pi-three.vercel.app/notes/action/create',
    siteName: 'NoteHub',
    images: [
      {
        url: 'https://blues.com/wp-content/uploads/2023/02/notehub-js.webp',
        width: 1200,
        height: 630,
        alt: 'Note: create new note',
      },
    ],
    type: 'article',
  },
};

export default function CreateNotePage() {
  return (
    <NoteFormPage />
  );
}