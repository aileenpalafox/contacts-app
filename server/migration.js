const { MongoClient } = require("mongodb");

// Replace the following with your Atlas connection string
const url = "mongodb+srv://admin:admin@cluster0.mywe7.mongodb.net/agenda?retryWrites=true&w=majority";
const client = new MongoClient(url);

// The database to use
const dbName = "agenda";

async function run() {
    try {
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(dbName);

        // Use the collection "people"
        const col = db.collection("contacts");

        // Construct a document
        let personDocument = {
            "name": "Aileen",
            "lastname": "Palafox",
            "company": "Encora",
            "phone": 1250000,
            "email": "aaa@aa"
        }

        // Insert a single document, wait for promise so we can read it back
        const p = await col.insertOne(personDocument);
        // Find one document
        const myDoc = await col.findOne();
        // Print to the consoleg
        console.log(myDoc);

    } catch (err) {
        console.log(err.stack);
    }

    finally {
        await client.close();
    }
}

run().catch(console.dir);