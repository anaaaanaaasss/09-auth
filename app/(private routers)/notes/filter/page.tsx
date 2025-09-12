import Link from 'next/link';
import css from './[...slug]/NotesClient.module.css';

export default function NotesClient() {

  return (
    <div>
      <Link href="/notes/action/create" className={css.button}>
        Create note +
      </Link>
      {/* Removed modal and NoteForm JSX block as per instructions */}
      {/* Other component code */}
    </div>
  );
}