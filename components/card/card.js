import Image from 'next/image';
import Link from 'next/link';
import cls from 'classnames';
import styles from './card.module.css';

const Card = (props) => {
  return (
    <Link href={props.href}>
      <a className={styles.cardAnchor}>
        <div className={cls('glass', styles.container)}>
          <div className={styles.headerContainer}>
            <h2 className={styles.cardHeader}>{props.name}</h2>
          </div>
          <div className={styles.imageContainer}>
            <Image
              src={props.imageUrl}
              alt={props.name}
              className={styles.cardImage}
              width={260}
              height={160}
            />
          </div>
        </div>
      </a>
    </Link>
  );
};

export default Card;
