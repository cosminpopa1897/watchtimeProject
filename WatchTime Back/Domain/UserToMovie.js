var SqlConnection = require("../Repository/SqlConnection")
var Sequelizer = require("sequelize");

const UserToMovie = SqlConnection.sequelize.define("UserToMovie",
    {
        id : { type : Sequelizer.INTEGER, primaryKey: true, autoIncrement : true},
        UserId : Sequelizer.INTEGER,
        MovieId :Sequelizer.INTEGER
    },
    {
        freezeTableName:true,
        timestamps:false
    }
)

module.exports.UserToMovie = UserToMovie;