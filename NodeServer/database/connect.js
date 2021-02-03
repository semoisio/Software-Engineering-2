const MongoClient = require('mongodb').MongoClient;

async function main() {
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
     * const uri = "mongodb+srv://groupOadmin:<password>@kielikanta.izgqz.mongodb.net/<dbname>?retryWrites=true&w=majority";
     */
    const uri = "mongodb+srv://groupOadmin:ot2kevat21@kielikanta.izgqz.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useUnifiedTopology: true });

    try {
        // Connect to the MongoDB cluster
        await client.connect();
        // Make the appropriate DB calls
        await  listDatabases(client);
        await create(client, "testi", "testicol", 
            {
                name: "Pekka",
                summary: "Testing creating",
                number: 10
            }
        );

        await findOneByNumber(client, "testi", "testicol", 10);

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

async function listDatabases(client){

    databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");

    databasesList.databases.forEach(db => console.log(` - ${db.name}`));

};

// Lisätään yksi objekti kantaan 
// Parametreina client, tietokanta, kokoelma ja objekti json muodossa
async function create(client, db, col, obj) {
    const result = await client.db(db).collection(col).insertOne(obj);
    console.log(`New listing created with the following id: ${result.insertedId}`);
}

// Haetaan yksi objekti kannasta numeron perusteella
async function findOneByNumber(client, db, col, number) {
    result = await client.db(db).collection(col).findOne({ number: number });

    if (result) {
        console.log(`Found a listing in the collection with the number '${number}':`);
        console.log(result);
    } else {
        console.log(`No listings found with the number '${number}'`);
    }
}

main().catch(console.error);

