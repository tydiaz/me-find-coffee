import { findRecordById } from '../../lib/airtable';

const getCoffeeShopById = async (req, res) => {
  const { id } = req.query;

  try {
    if (id) {
      const coffeeShopRecords = await findRecordById(id);

      if (coffeeShopRecords.length !== 0) {
        res.json(coffeeShopRecords);
      } else {
        res.json({ message: 'id could not be found' });
      }
    } else {
      res.status(400);
      res.json({ message: 'id is missing' });
    }
  } catch (error) {
    res.status(500);
    res.json({ message: 'something went wrong:', error });
  }
};

export default getCoffeeShopById;
