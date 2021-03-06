import Head from 'next/head';
import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';
import Card from '../components/card/card';
import Banner from '../components/banner/banner';
import { ACTION_TYPES, StoreContext } from '../store/store-context';
import useGeoLocation from '../hooks/useGeoLocation';
import { fetchCoffeeShops } from '../lib/coffee-shops';
import styles from '../styles/Home.module.css';
// import coffeeShopsData from '../data/coffee-shops.json';

export async function getStaticProps(context) {
  const coffeeShops = await fetchCoffeeShops();
  return {
    props: {
      coffeeShops,
    },
  };
}

export default function Home(props) {
  // const [coffeeShops, setCoffeeShops] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const { dispatch, state } = useContext(StoreContext);
  const { coffeeShops, coordinates } = state;
  const { handleGeoLocation, isLoading, locationErrorMessage } =
    useGeoLocation();

  useEffect(() => {
    const getCoffeeShops = async () => {
      if (coordinates) {
        try {
          const coffeeShopsApi = `/api/getCoffeeShopsByLocation?coords=${coordinates}&limit=30`;
          const fetchedCoffeeShops = await fetch(coffeeShopsApi);
          const coffeeShops = await fetchedCoffeeShops.json();

          // setCoffeeShops(fetchedCoffeeShops);
          dispatch({
            type: ACTION_TYPES.SET_COFFEE_SHOPS,
            payload: {
              coffeeShops,
            },
          });
          setErrorMessage('');
        } catch (error) {
          setErrorMessage(error.message);
        }
      }
    };
    getCoffeeShops();
  }, [coordinates, dispatch]);

  const onBannerBtnClick = () => {
    handleGeoLocation();
  };
  let imgUrl =
    'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80';

  return (
    <div className={styles.container}>
      <Head>
        <title>Me Find Coffee</title>
        {/* Icon provided by Icons8 https://icons8.com/icon/KRQgTwddkc3A/coffee */}
        <meta
          name='description'
          content='allows you to find coffee shops near you'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <Banner
          buttonText={isLoading ? 'Locating...' : 'Find shops near me'}
          handleOnClick={onBannerBtnClick}
        />
        {locationErrorMessage && (
          <p>Something went wrong: {locationErrorMessage}</p>
        )}
        {errorMessage && <p>Something went wrong: {errorMessage}</p>}
        <div className={styles.heroImage}>
          <Image
            src='/static/hero-image.png'
            alt='coffee image'
            width={600}
            height={300}
          />
        </div>
        {coffeeShops.length > 0 && (
          <div className={styles.sectionWrapper}>
            <h2 className={styles.header}>Coffee Shops near me</h2>
            <div className={styles.cardLayout}>
              {coffeeShops.map((coffeeShop) => {
                return (
                  <Card
                    name={coffeeShop.name}
                    key={coffeeShop.id}
                    href={`/coffee-shop/${coffeeShop.id}`}
                    imageUrl={coffeeShop.imageUrl || imgUrl}
                    className={styles.card}
                  />
                );
              })}
            </div>
          </div>
        )}
        {props.coffeeShops.length > 0 && (
          <div className={styles.sectionWrapper}>
            <h2 className={styles.header}>Pompano Beach Coffee Shops</h2>
            <div className={styles.cardLayout}>
              {props.coffeeShops.map((coffeeShop) => {
                return (
                  <Card
                    name={coffeeShop.name}
                    key={coffeeShop.id}
                    href={`/coffee-shop/${coffeeShop.id}`}
                    imageUrl={coffeeShop.imageUrl || imgUrl}
                    className={styles.card}
                  />
                );
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
