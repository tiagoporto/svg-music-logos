const db = { bands: '' }

db.bands.aggregate([
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
