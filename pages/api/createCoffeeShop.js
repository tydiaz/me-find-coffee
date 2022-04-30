import { findRecordById, getMinifiedRecords, table } from '../../lib/airtable';

const createCoffeeShop = async (req, res) => {
  if (req.method === 'POST') {
    const { id, name, address, neighborhood, votes, imageUrl } = req.body;

    try {
      if (id) {
        const coffeeShopRecords = await findRecordById(id);

        if (coffeeShopRecords.length !== 0) {
          res.json(coffeeShopRecords);
        } else {
          if (name) {
            const createCoffeeShopRecords = await table.create([
              {
                fields: {
                  id,
                  name,
                  address,
                  neighborhood,
                  votes,
                  imageUrl,
                },
              },
            ]);
            const records = getMinifiedRecords(createCoffeeShopRecords);
            res.json(records);
          } else {
            //res.status(400);
            // april fools bad request
            res.status(418);
            res.json({ message: 'Id or name is missing' });
          }
        }
      } else {
        res.status(400);
        res.json({ message: 'Id is missing' });
      }
    } catch (error) {
      console.error('Error creating and/or finding Coffee Shop record:', error);
      res.status(500);
      res.json({
        message: 'error creating and/or finding coffee shop record',
        error,
      });
    }
  }
};

export default createCoffeeShop;
