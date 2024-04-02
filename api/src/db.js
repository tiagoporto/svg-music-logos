var Sequelize = require('sequelize')

var Conn = new Sequelize('', '', '', {
  host: '',
  dialect: 'mysql',
})

module.exports = Conn
