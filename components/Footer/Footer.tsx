import css from './Footer.module.css';

const Footer = () => (
  <footer className={css.footer}>
    <div className={css.content}>
      <p>© {new Date().getFullYear()} NoteHub</p>
      <p>Developer: Viacheslav Zykov</p>
      {/* <div className={css.wrap}></div> */}
    </div>
  </footer>
);

export default Footer;
