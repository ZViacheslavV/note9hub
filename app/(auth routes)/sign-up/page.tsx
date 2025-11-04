'use client';

import { useRouter } from 'next/navigation';
import css from './SignUpPage.module.css';
import { useState } from 'react';
import { register, LogRegRequest } from '@/lib/clientApi';
import { AxiosError } from 'axios';
import { useAuthStore } from '@/lib/store/authStore';

const SignUp = () => {
  const router = useRouter();
  const [error, setError] = useState('');
  const setUser = useAuthStore((state) => state.setUser);

  const handleSubmit = async (formData: FormData) => {
    const formValues = Object.fromEntries(formData) as unknown as LogRegRequest;

    try {
      const res = await register(formValues);

      if (res) {
        setUser(res);
        router.push('/profile');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      const error = err as AxiosError<{ error?: string }>;
      setError(error.response?.data?.error ?? error.message ?? 'Oops something went error');
    }
  };
  return (
    <main className={css.mainContent}>
      <h1 className={css.formTitle}>Sign up</h1>
      <form className={css.form} action={handleSubmit}>
        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" className={css.input} required />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" className={css.input} required />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton} /* disabled={isPending} */>
            Register
            {/* {isPending?'Registering...': 'Register'}   */}
          </button>
        </div>

        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
};

export default SignUp;
