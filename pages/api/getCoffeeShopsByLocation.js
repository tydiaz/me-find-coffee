import { fetchCoffeeShops } from '../../lib/coffee-shops';

const getCoffeeShopsByLocation = async (req, res) => {
  try {
    const { coords, limit } = req.query;
    const response = await fetchCoffeeShops(coords, limit);

    res.status(200);
    res.json(response);
  } catch (err) {
    console.error('Error fetching API', err);
    res.status(500);
    res.json({ message: 'Something went wrong with API:', err });
  }
};

export default getCoffeeShopsByLocation;
