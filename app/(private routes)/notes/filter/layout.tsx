'use client';

import { useState, useEffect } from 'react';
import clsx from 'clsx';
import css from './LayoutNotes.module.css';

interface Props {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}

const EDGE_ZONE = 30;

const NotesLayout = ({ children, sidebar }: Props) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (e.clientX <= EDGE_ZONE) setOpen(true);
      if (e.clientX > 250) setOpen(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className={css.container}>
      <aside
        className={clsx(css.sidebar, {
          [css.sidebarVisible]: open,
        })}
      >
        {sidebar}
      </aside>

      <div className={css.notesWrapper}>{children}</div>
    </section>
  );
};

export default NotesLayout;

/* import css from './LayoutNotes.module.css';

interface Props {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}

const NotesLayout = ({ children, sidebar }: Props) => (
  <section className={css.container}>
    <aside className={css.sidebar}>{sidebar}</aside>
    <div className={css.notesWrapper}>{children}</div>
  </section>
);

export default NotesLayout; */
