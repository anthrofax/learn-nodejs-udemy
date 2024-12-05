const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let db;

const connection = (callback) => {
  MongoClient.connect(
    `mongodb+srv://anthrofax:Qz5JnvHh3ljaKMX4@nodejs-udemy-ecomerce.gmbku.mongodb.net/?retryWrites=true&w=majority&appName=nodejs-udemy-ecomerce`
  )
    .then((client) => {
      db = client.db();
    })
    .catch((err) => {
      console.log(`Error: ${err}`);
    });
};

const getDb = () => {
  if (db) return db;

  throw "No database connection found!";
};

module.exports = { getDb, connection };