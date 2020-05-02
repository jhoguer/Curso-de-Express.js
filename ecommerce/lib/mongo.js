const { MongoClient, ObjectId } = require('mongodb');
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

  async connect() {
    if (!MongoLib.connection) {
      try {
        await this.client.connect()
        console.log('Connected successfully to mongo')
        MongoLib.connection = this.client.db(this.dbName)
      } catch (error) {
        console.log(error)
      } 
    }
    // console.log('Conexion de la DB MONGO==>', MongoLib.connection);
    return MongoLib.connection
  }

  // connect() {
  //   return new Promise((resolve, reject) => {
  //     this.client.connect(error => {
  //       if(error) {
  //         reject(error);
  //       }

  //       console.log("Connected successfully to mongo!");
  //       resolve(this.client.db(this.dbName));
  //     });
  //   });
  // }

  getAll(collection, query) {
    return this.connect()
      .then(db => {
        return db.collection(collection).find(query).toArray();
      });
  }

  async get(collection, id) {
    const db = await this.connect();
    return await db.collection(collection).findOne({ _id: ObjectId(id) })
  }

  // async get(collection, id) {
  //   console.log('ProductId en Libs--------->', id);
  //   return this.connect()
  //     .then(db => {
  //     return db.collection(collection).findOne({ _id: ObjectId(id) });
  //   });
  // }

  create(collection, data) {
    return this.connect()
      .then(db => {
      return db.collection(collection).insertOne(data);
    })
    .then(result => result.insertedId);
  }

  update(collection, id, data) {
    return this.connect()
      .then(db => {
        return db.collection(collection)
          .updateOne( { _id: ObjectId(id) }, { $set: data }, { upsert: true } )
      })
      .then(result => result.upsertedId || id);
  }

  delete(collection, id) {
    return this.connect()
      .then(db => {
        return db.collection(collection).deleteOne({ _id: ObjectId(id) });
      })
      .then(() => id);
  }


}

module.exports = MongoLib;
