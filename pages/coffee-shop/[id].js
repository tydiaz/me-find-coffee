import { useContext, useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import cls from 'classnames';
import { StoreContext } from '../../store/store-context';
import { fetcher, isEmpty } from '../../utils';
import { fetchCoffeeShops } from '../../lib/coffee-shops';
import styles from '../../styles/CoffeeShop.module.css';

export async function getStaticProps(staticProps) {
  const params = staticProps.params;
  const coffeeShops = await fetchCoffeeShops();
  const findCoffeeShopsById = coffeeShops.find((coffeeShop) => {
    return coffeeShop.id.toString() === params.id;
  });
  return {
    props: {
      coffeeShop: findCoffeeShopsById ? findCoffeeShopsById : {},
    },
  };
}

export async function getStaticPaths() {
  const coffeeShops = await fetchCoffeeShops();
  const coffeeShopPaths = coffeeShops.map((coffeeShop) => {
    return {
      params: {
        id: coffeeShop.id.toString(),
      },
    };
  });

  return {
    paths: coffeeShopPaths,
    fallback: true,
  };
}

const CoffeeShop = (initialProps) => {
  const router = useRouter();
  const id = router.query.id;

  // const [coffeeShop, setCoffeeShop] = useState(initialProps.coffeeShop);
  const [coffeeShop, setCoffeeShop] = useState(initialProps.coffeeShop || {});
  const {
    state: { coffeeShops },
  } = useContext(StoreContext);

  const onHandleCreateCoffeeShop = async (coffeeShop) => {
    try {
      const { id, name, address, neighborhood, votes, imageUrl } = coffeeShop;
      const response = await fetch('/api/createCoffeeShop', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          name,
          address: address || '',
          neighborhood: neighborhood[0] || '',
          votes: 0,
          imageUrl,
        }),
      });
      const coffeeShopDb = response.json();
    } catch (err) {
      console.error('Error creating coffee shop', err);
    }
  };

  useEffect(() => {
    if (isEmpty(initialProps.coffeeShop)) {
      if (coffeeShops.length > 0) {
        const coffeeShopFromContext = coffeeShops.find((coffeeShop) => {
          return coffeeShop.id.toString() === id;
        });

        if (coffeeShopFromContext) {
          setCoffeeShop(coffeeShopFromContext);
          onHandleCreateCoffeeShop(coffeeShopFromContext);
        }
      }
    } else {
      onHandleCreateCoffeeShop(initialProps.coffeeShop);
    }
  }, [id, initialProps, initialProps.coffeeShop, coffeeShops]);

  const { address, imageUrl, name, neighborhood } = coffeeShop;
  const [voteCount, setVoteCount] = useState(0);

  const { data, error } = useSWR(`/api/getCoffeeShopById?id=${id}`, fetcher);

  useEffect(() => {
    if (data && data.length > 0) {
      setCoffeeShop(data[0]);
      setVoteCount(data[0].votes);
    }
  }, [data]);

  const onHandleUpVote = async () => {
    try {
      const response = await fetch('/api/rateCoffeeShopById', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
        }),
      });
      const coffeeShopDb = await response.json();

      if (coffeeShopDb && coffeeShopDb.length > 0) {
        let count = voteCount + 1;
        setVoteCount(count);
      }
    } catch (err) {
      console.error('error updating coffee shop rating:', err);
    }
  };

  if (error) {
    return <div>Something went wrong retrieving Coffee Shop page!</div>;
  }

  let imgUrl =
    'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80';

  if (router.isFallback) {
    return <div>Loading....</div>;
  }

  return (
    <div className={styles.layout}>
      <Head>
        <title>{name}</title>
        <meta name='description' content={`${name} coffee shop`}></meta>
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
            <p className={styles.text}>{voteCount}</p>
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
