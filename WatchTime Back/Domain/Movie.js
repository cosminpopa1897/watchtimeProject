var SqlConnection = require('../Repository/SqlConnection')
var Sequelize = require('sequelize')
const Movie = SqlConnection.sequelize.define('movies',{
    id: {type : Sequelize.INTEGER, primaryKey:true, autoIncrement : true },
    ApiId: Sequelize.INTEGER,
    Name: Sequelize.TEXT
},
{
    timestamps : false,
    freezeTableName : true
} )

module.exports.Movie = Movie;