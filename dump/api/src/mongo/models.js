const mongo = require('./db')

module.exports = {
  async getLogos() {
    await mongo.init()
    const Bands = await mongo.db
      .collection('bands')
      .aggregate([
        {
          $lookup: {
            from: 'countries',
            localField: 'origin',
            foreignField: '_id',
            as: 'origin',
          },
        },
        {
          $lookup: {
            from: 'genres',
            localField: 'genre',
            foreignField: '_id',
            as: 'genre',
          },
        },
        {
          $project: {
            _id: 0,
            name: 1,
            link: 1,
            genre: '$genre.genre',
            origin: '$origin.name',
            logos: 1,
          },
        },
      ])
      .toArray()
    return Bands
  },

  async getOrigins() {
    await mongo.init()
    const countries = await mongo.db.collection('countries').find().toArray()

    return countries.map((i) => i.name)
  },

  async getGenres() {
    await mongo.init()
    const genres = await mongo.db.collection('genres').find().toArray()

    return genres.map((i) => i.genre)
  },
}
