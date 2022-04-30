const Airtable = require('airtable');

const base = new Airtable({
  apiKey: process.env.NEXT_PUBLIC_AIRTABLE_API_KEY,
}).base(process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID);

const table = base('me-find-coffee');

const getMinifiedRecord = (record) => {
  return {
    recordId: record.id,
    ...record.fields,
  };
};

const getMinifiedRecords = (records) => {
  return records.map((record) => getMinifiedRecord(record));
};

const findRecordById = async (id) => {
  const findCoffeeShopRecords = await table
    .select({
      filterByFormula: `id="${id}"`,
    })
    .firstPage();

  return getMinifiedRecords(findCoffeeShopRecords);
};

const updateRecord = async (id, votes) => {
  return await table.update([
    {
      id,
      fields: {
        votes,
      },
    },
  ]);
};

export { table, getMinifiedRecords, findRecordById, updateRecord };
