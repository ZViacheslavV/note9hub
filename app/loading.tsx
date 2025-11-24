/* import css from './loading.module.css';

const Loading = () => <p className={css.textMessage}>Loading, please wait...</p>;

export default Loading;
 */

import css from './loading.module.css';

const Loading = () => (
  <div className={css.overlay}>
    <div className={css.spinner}></div>
  </div>
);

export default Loading;
