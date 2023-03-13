const {Sequelize} = require('sequelize')

const database = require('../../config/database')

const sequelize = new Sequelize(database.database, database.username, database.password, {
    host: database.host,
    port: parseInt(database.port, 10),
    define: {
        underscored: true
    },
    dialect: database.dialect,
})

module.exports = sequelize