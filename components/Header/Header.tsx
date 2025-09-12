import Link from 'next/link';
import css from './Header.module.css';
import { Routes } from '@/lib/routes';
import TagsMenu from '../TagsMenu/TagsMenu';
import { getCategories } from '@/app/server/serverApi';
import AuthNavigation from '../AuthNavigation/AuthNavigation';

const Header = async () => {
  const categories = await getCategories() as ('All' | 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping')[];

  return (
    <header className={css.header}>
      <Link href={Routes.Home} aria-label="Home">
        NoteHub
      </Link>
      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li>
            <Link href={Routes.Notes}>Home</Link>
          </li>
          <li>
            <TagsMenu categories={categories} />
          </li>
          <AuthNavigation />
        </ul>
      </nav>
    </header>
  );
};

export default Header;