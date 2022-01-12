const Airtable = require('airtable');

const base = new Airtable({
  apiKey: process.env.NEXT_PUBLIC_AIRTABLE_API_KEY,
}).base(process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID);

const table = base('me-find-coffee');

console.log({ table });

const createCoffeeShop = async (req, res) => {
  console.log({ req });

  if (req.method === 'POST') {
    try {
      const findCoffeeShopRecords = await table
        .select({
          filterByFormula: `id=0`,
        })
        .firstPage();

      console.log({ findCoffeeShopRecords });

      if (findCoffeeShopRecords.length !== 0) {
        const records = findCoffeeShopRecords.map((record) => {
          return {
            ...record.fields,
          };
        });
        res.json(records);
      } else {
        res.json({ message: 'create a record' });
      }
    } catch (error) {
      console.error('Error finding Coffee Shop record:', error);
      res.status(500);
      res.json({ message: 'Error Finding Coffee Shop Record!', error });
    }
  }
};

export default createCoffeeShop;
