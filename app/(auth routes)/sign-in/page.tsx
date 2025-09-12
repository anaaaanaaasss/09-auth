'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginUser } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import css from './SignInPage.module.css';

export default function SignInPage() {
  const router = useRouter();
  const setUser = useAuthStore(state => state.setUser);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const user = await loginUser({ email, password });
      setUser(user);
      router.push('/profile');
    } catch {
      setError('Invalid email or password');
    }
  };

  return (
<main className={css.mainContent}>
    <form className={css.form} onSubmit={handleSubmit}>
      <h1 className={css.formTitle}>Sign in</h1>

      <div className={css.formGroup}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          className={css.input}
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          className={css.input}
          required
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </div>

      <div className={css.actions}>
        <button type="submit" className={css.submitButton}>
          Log in
        </button>
      </div>

      {error && <p className={css.error}>{error}</p>}
    </form>
</main>
  );
}