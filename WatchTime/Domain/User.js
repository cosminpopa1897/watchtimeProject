 // function User(id, username, firstName, lastName, email, favoriteMovies){
//     this.Id = id;
//     this.Username = username;
//     this.FirstName = firstName;
//     this.LastName = lastName;
//     this.Email = email;
//     this.FavoriteMovies = favoriteMovies;
// }
var SqlConnection = require('../Repository/SqlConnection');
var Sequelize = require('sequelize');
var MovieEntity = require('../Domain/Movie')
var UserToMovieEntity = require('../Domain/UserToMovie')

const User = SqlConnection.sequelize.define( "User", {
    Id : {type: Sequelize.INTEGER, primaryKey:true, autoIncrement: true},
    Username : Sequelize.STRING,
    FirstName : Sequelize.STRING,
    LastName : Sequelize.STRING,
    Email : Sequelize.STRING
},
{
    freezeTableName : true,
    timestamps : false
}
);

User.belongsToMany(MovieEntity.Movie, { as : "movies", through : UserToMovieEntity.UserToMovie, foreignKey : "UserId"}) 
MovieEntity.Movie.belongsToMany(User, {as : "users" ,through : UserToMovieEntity.UserToMovie, foreignKey : "MovieId"})
module.exports.User = User;