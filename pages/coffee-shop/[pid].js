import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import cls from 'classnames';
import { fetchCoffeeShops } from '../../lib/coffee-shops';
import styles from '../../styles/CoffeeShop.module.css';

export async function getStaticProps({ params }) {
  console.log('params', params);
  const coffeeShops = await fetchCoffeeShops();
  return {
    props: {
      coffeeShop: coffeeShops.find((coffeeShop) => {
        return coffeeShop.id.toString() === params.pid;
      }),
    },
  };
}

export async function getStaticPaths() {
  const coffeeShops = await fetchCoffeeShops();
  const coffeeShopPaths = coffeeShops.map((coffeeShop) => {
    return {
      params: {
        pid: coffeeShop.id.toString(),
      },
    };
  });

  return {
    paths: coffeeShopPaths,
    fallback: true,
  };
}

const CoffeeShop = (props) => {
  const router = useRouter();
  const { pid } = router.query;

  console.log(router.query);
  console.log(pid);
  console.log('props', props);

  if (router.isFallback) {
    return <div>Loading....</div>;
  }

  const { address, imageUrl, name, neighborhood, phoneNumber } =
    props.coffeeShop;

  const onHandleUpVote = () => {
    console.log('up vote');
  };
  let imgUrl =
    'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80';

  return (
    <div className={styles.layout}>
      <Head>
        <title>{name}</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.column1}>
          <div className={styles.link}>
            <Link href='/'>
              <a>← Back to Home</a>
            </Link>
          </div>
          <div className={styles.nameContainer}>
            <p className={styles.name}>{name}</p>
            {/* <p>{phoneNumber || '(954)-366-1118'}</p> */}
          </div>
          <Image
            src={imageUrl || imgUrl}
            alt={name}
            className={styles.shopImage}
            width={600}
            height={360}
          ></Image>
        </div>
        <div className={cls('glass', styles.column2)}>
          <div className={styles.icon}>
            <Image
              src='/static/icons/places.svg'
              alt='marker'
              width={24}
              height={24}
            />
            <p className={styles.text}>{address}</p>
          </div>
          {neighborhood && (
            <div className={styles.icon}>
              <Image
                src='/static/icons/nearMe.svg'
                alt='near me'
                width={24}
                height={24}
              />
              <p className={styles.text}>{neighborhood}</p>
            </div>
          )}
          <div className={styles.icon}>
            <Image
              src='/static/icons/star.svg'
              alt='star'
              width={24}
              height={24}
            />
            <p className={styles.text}>5</p>
          </div>
          <button className={styles.button} onClick={onHandleUpVote}>
            Up Vote!
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoffeeShop;
