import css from './loading.module.css';

const Loading = () => (
  <div className={css.overlay}>
    <div className={css.spinner}></div>
  </div>
);

export default Loading;
