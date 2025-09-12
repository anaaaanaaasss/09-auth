'use client';

import css from './NoteForm.module.css';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '@/lib/api';
import { Loading } from 'notiflix';
import toast from 'react-hot-toast';
import { useNoteStore } from '@/lib/store/noteStore';
import { useRouter } from 'next/navigation';

interface NoteFormProps {
  categories: ("All" | "Todo" | "Work" | "Personal" | "Meeting" | "Shopping")[];
  onSubmit: (data: { title: string; content: string; tag: string }) => void;
  onCancel: () => void;
}

export default function NoteForm({
  categories,
  onSubmit,
  onCancel,
}: NoteFormProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { draft, setDraft, clearDraft } = useNoteStore();

  const noteCreation = useMutation({
    mutationFn: async ({ title, content, tag }: typeof draft) => {
      const data = await createNote(title, content, tag);
      return data;
    },
    onSuccess: (_, variables) => {
      Loading.remove();
      toast.success('Note has been successfully created!');
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      onSubmit(variables); // передаем корректные данные, а не очищенный черновик
      clearDraft();
      router.push('/notes');
    },
    onError: () => {
      Loading.remove();
      toast.error('Error occurred while creating note!');
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setDraft({ [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    Loading.hourglass();
    noteCreation.mutate(draft);
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          className={css.input}
          value={draft.title}
          onChange={handleChange}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          name="content"
          id="content"
          rows={8}
          className={css.textarea}
          value={draft.content}
          onChange={handleChange}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          name="tag"
          id="tag"
          className={css.select}
          value={draft.tag}
          onChange={handleChange}
        >
          {categories
            .filter((tag) => tag !== 'All')
            .map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
        </select>
      </div>

      <div className={css.actions}>
        <button type="button" className={css.cancelButton} onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className={css.submitButton}>
          Create note
        </button>
      </div>
    </form>
  );
}