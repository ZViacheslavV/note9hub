'use client';

import { useRouter } from 'next/navigation';
import css from './SignInPage.module.css';
import { useRef, useState } from 'react';
import { login, LogRegRequest } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import { ApiError } from '@/app/api/api';

const SignIn = () => {
  const router = useRouter();
  const [error, setError] = useState('');
  const setUser = useAuthStore((state) => state.setUser);

  const emailRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (formData: FormData) => {
    const formValues = Object.fromEntries(formData) as unknown as LogRegRequest;
    try {
      const res = await login(formValues);

      if (res) {
        setUser(res);
        router.push('/profile');
      } else setError('Invalid email or password');
    } catch (err) {
      setError(
        (err as ApiError).response?.data?.error ??
          (err as ApiError).message ??
          'Oops something went wrong'
      );
    }
  };

  const handleGuestLogin = () => {
    if (emailRef.current) emailRef.current.value = 'user@example.com';
    if (passRef.current) passRef.current.value = 'password123';
  };

  return (
    <main className={css.mainContent}>
      <form className={css.form} action={handleSubmit}>
        <h1 className={css.formTitle}>Sign in</h1>

        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            ref={emailRef}
            className={css.input}
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            ref={passRef}
            className={css.input}
            required
          />
        </div>

        <div className={css.actions}>
          <button type="submit" onClick={handleGuestLogin} className={css.submitButton}>
            Log in as Guest
          </button>
          <button type="submit" className={css.submitButton}>
            Log in
          </button>
        </div>

        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
};

export default SignIn;
