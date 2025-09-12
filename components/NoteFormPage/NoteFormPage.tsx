'use client';

import NoteForm from '@/components/NoteForm/NoteForm';
import { useRouter } from 'next/navigation';

const categories = ['All', 'Todo', 'Work', 'Personal', 'Meeting', 'Shopping'] as const;
export default function NoteFormPage() {
  const router = useRouter();

  const handleSubmit = (data: { title: string; content: string; tag: string }) => {
    console.log('Submitting note', data);
    router.push('/notes');
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <NoteForm
      categories={categories.filter((tag) => tag !== 'All')}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
    />
  );
}