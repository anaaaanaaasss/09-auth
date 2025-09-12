// app/(auth routers)/sign-up/layout.tsx
import { ReactNode } from 'react';
import css from './SignUpPage.module.css';

export default function SignUpLayout({ children }: { children: ReactNode }) {
  return <section className={css.authWrapper}>{children}</section>;
}