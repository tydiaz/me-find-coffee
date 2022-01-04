import { createApi } from 'unsplash-js';

const unsplashApi = createApi({
  accessKey: process.env.NEXT_PUBLIC_ACCESS_KEY_UNSPLASH,
});

const coffeeShopsApi = (latLong, limit, query) => {
  return `https://api.foursquare.com/v3/places/nearby?ll=${latLong}&query=${query}&limit=${limit}`;
};

const getCoffeePhotos = async () => {
  const unsplashPhotos = await unsplashApi.search.getPhotos({
    query: 'coffee shop',
    perPage: 10,
  });

  const unsplashResults = unsplashPhotos.response?.results || [];
  return unsplashResults.map((result) => result.urls['small']);
};

export const fetchCoffeeShops = async (
  coords = '26.2255630987558,-80.15119384942192'
) => {
  const photos = await getCoffeePhotos();
  const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: process.env.NEXT_PUBLIC_API_KEY,
    },
  };

  const response = await fetch(coffeeShopsApi(coords, 6, 'coffee'), options);

  const data = await response.json();
  console.log(data);

  return data.results?.map((place, idx) => {
    return {
      id: place.fsq_id,
      address: place.location.address || '',
      name: place.name,
      neighborhood:
        place.location.neighborhood || place.location.crossStreet || '',
      imageUrl: photos[idx],
    };
  });
};
