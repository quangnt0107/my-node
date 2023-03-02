const { MongoClient } = require('mongodb');
const dbName = 'mydb'
const mongodbUrl = `mongodb+srv://21550022:21550022@cluster0.40tmwlh.mongodb.net/${dbName}?retryWrites=true&w=majority`;


const listDatabases = async (client) => {
  databasesList = await client.db().admin().listDatabases();

  console.log("Databases:");
  databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

async function createListing(client, newListing){
  const result = await client.db(dbName).collection("listingsAndReviews").insertOne(newListing);
  console.log(`New listing created with the following id: ${result.insertedId}`);
}


const connectDB = async () => {
  const client = new MongoClient(mongodbUrl);
  
  try {
    // Connect to the MongoDB cluster
    await client.connect();

    // Make the appropriate DB calls
    await listDatabases(client);

    // create
    await createListing(client,
      {
          name: "Lovely Loft",
          summary: "A charming loft in Paris",
          bedrooms: 1,
          bathrooms: 1
      }
  );

} catch (e) {
    console.error(e);
} finally {
    await client.close();
}
};

connectDB().then(res => console.log(res)).catch(err => console.error(err)).finally(() => console.log());
