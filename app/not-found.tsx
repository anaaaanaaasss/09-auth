import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 Not Found | NoteHub',
  description: 'Oops! This page does not exist.',
  openGraph: {
    title: '404 Not Found | NoteHub',
    description: 'Oops! This page does not exist.',
    url: 'https://08-zustand-pi-three.vercel.app/not-found',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
      },
    ],
  },
};

import css from './Home.module.css';

const NotFound = () => {
  return (
    <div className={css.container}>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
};

export default NotFound;