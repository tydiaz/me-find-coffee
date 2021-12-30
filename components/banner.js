import styles from './banner.module.css';

const Banner = (props) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <span className={styles.titleSpan1}>Me Find</span>
        <span className={styles.titleSpan2}>Coffee</span>
      </h1>
      <p className={styles.subtitle}>Discover your local coffee shops!</p>
      <button className={styles.button} onClick={props.handleOnClick}>
        {props.buttonText}
      </button>
    </div>
  );
};

export default Banner;
