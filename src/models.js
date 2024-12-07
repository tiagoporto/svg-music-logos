const db = require('./db')

module.exports = {
  // async getLogos() {
  // },

  async getOrigins() {
    console.log('db ', db)
    // const countries = await mongo.db.collection('countries').find().toArray()

    return ['USA']
  },

  // async getGenres() {
  // },
}
