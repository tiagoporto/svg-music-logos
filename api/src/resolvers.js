const { getLogos, getOrigins, getGenres } = require('./models')

module.exports = {
  Query: {
    logos: (obj, { band }) => getLogos(),
    genres: () => getGenres(),
    origins: (obj) => getOrigins(),
  },
  Band: {
    name: (obj) => obj.name,
    css: (obj) => obj.css,
    origin: (obj) => obj.origin,
    genre: (obj) => obj.genre,
    link: (obj) => obj.link,
    logos: (obj) => obj.logos,
  },
  Logo: {
    title: (obj) => obj.title,
    svg: (obj) => obj.svg,
    cls: (obj) => obj.cls,
  },
}
