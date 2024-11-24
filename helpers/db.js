const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const connection = (callback) => {
  MongoClient.connect(
    `mongodb+srv://anthrofax:Qz5JnvHh3ljaKMX4@nodejs-udemy-ecomerce.gmbku.mongodb.net/?retryWrites=true&w=majority&appName=nodejs-udemy-ecomerce`
  )
    .then((client) => {
      console.log(client);
      callback(client);
    })
    .catch((err) => {
      console.log(`Error: ${err}`);
    });
};

module.exports = connection;