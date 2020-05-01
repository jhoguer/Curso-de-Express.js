const { MongoClient } = require('mongodb');
const { config } = require('../config');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = config.dbName;

const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${config.dBHost}/${DB_NAME}?retryWrites=true&w=majority`;


class MongoLib {
  constructor() {
    // console.log('MONGO_URI', MONGO_URI);
    this.client = new MongoClient(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    this.dbName = DB_NAME;
  }

  // async connect() {
  //   try {
  //   await this.client.connect();
  //     console.log('MongoDB is Connected!!');
  //     return this.client.db(this.dbName);
  //   } catch(err) {
  //     console.error(err)
  //   }
  // }

  connect() {
    return new Promise((resolve, reject) => {
      this.client.connect(error => {
        if(error) {
          reject(error);
        }

        console.log("Connected successfully to mongo!");
        resolve(this.client.db(this.dbName));
      });
    });
  }

  getAll(collection, query) {
    return this.connect()
      .then(db => {
        return db.collection(collection).find(query).toArray();
      });
  }
}

module.exports = MongoLib;
