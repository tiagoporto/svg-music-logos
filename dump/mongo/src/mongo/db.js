const MongoClient = require('mongodb').MongoClient

class Mongo {
  constructor() {
    this.dbName = 'musiclogosdb'

    const url = 'mongodb://localhost:27017'
    this.client = new MongoClient(url, { useUnifiedTopology: true })
  }

  async init() {
    await this.client.connect()
    console.log('connected')

    this.db = this.client.db(this.dbName)
  }
}

module.exports = new Mongo()
