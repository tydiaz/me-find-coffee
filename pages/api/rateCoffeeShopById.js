import {
  findRecordById,
  getMinifiedRecords,
  updateRecord,
} from '../../lib/airtable';

const rateCoffeeShopById = async (req, res) => {
  if (req.method === 'PUT') {
    try {
      const { id } = req.body;

      if (id) {
        const records = await findRecordById(id);

        if (records.length !== 0) {
          const record = records[0];
          const calculateVotes = parseInt(record.votes) + 1;
          const updateCoffeeShopRecord = await updateRecord(
            record.recordId,
            calculateVotes
          );

          if (updateCoffeeShopRecord) {
            const minifiedRecord = getMinifiedRecords(updateCoffeeShopRecord);

            res.json(minifiedRecord);
          }
        } else {
          res.json({ message: 'coffee shop id does not exist!', id });
        }
      } else {
        res.status(400);
        res.json({ message: 'id is missing' });
      }
    } catch (error) {
      res.status(500);
      res.json({ message: 'error rating coffee shop', error });
    }
  }
};

export default rateCoffeeShopById;
