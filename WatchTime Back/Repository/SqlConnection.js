var mysql = require('mysql');
const Sequelize = require('sequelize');
const sequelize = new Sequelize('watchtime', 'root', '', {
    host : 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        aquire : 30000,
        idle : 10000
    },
    

});

sequelize
    .authenticate()




var Connect = function(){
    connection.connect(function(err){
    if (err) throw err;
    console.log("Connected");
})}


module.exports.Connect = Connect;
// module.exports.connection = connection;
module.exports.mysql = mysql;
module.exports.InsertUser = InsertUser;
module.exports.GetAllUsers = GetAllUsers;
module.exports.sequelize = sequelize;

