var SqlConnection = require('../Repository/SqlConnection');
var UserEntity = require ('../Domain/User');
var MovieEntity = require('../Domain/Movie');
var MovieRepository = require('./MovieRepository');
var UserToMovie = require('../Domain/UserToMovie')

function InsertUser(username, firstName, lastName, email, movies){
    UserEntity.User.create({ Username : username, 
                        FirstName : firstName, 
                        LastName : lastName,
                        Email : email})
                        .then((result)=> {
                            var userId = result.dataValues.Id;
                            movies.forEach(function(movie) {
                                MovieEntity.Movie.findById(movie.Id)
                                    .then(result=>{
                                        CreateOrUpdateLInks(result, JSON.stringify(movie), userId)
                                    }
                                )
                                
                               
                            }, this);
                        })
}

function UpdateUser(id, username, firstName, lastName, email, movies){
    UserEntity.User.update({
        Username : username,
        FirstName : firstName,
        LastName : lastName,
        Email : email
    },
    { where: {Id : id}}
    )
    .then((result) =>{
        movies.forEach(function(movie) {
            MovieEntity.Movie.findById(movie.Id)
            .then(result=>{
            CreateOrUpdateLInks(result, JSON.stringify(movie), id)
            }
    , this);
    })
}
)}

function DeleteUser(id, callback, container){
    UserToMovie.UserToMovie.destroy({
        where :{
         UserId : id   
        }
    })
    UserEntity.User.destroy({
        where :{
            Id : id
        }
    })
    .then(result =>{
        container.result = result;
        callback(container);
    }) 
}

function GetUser(username, callback, container){
    UserEntity.User.findOne({
        where : {Username : username},
        include : [ {model : MovieEntity.Movie, as : "movies"}],
    }).then(result => {
        container.result = result ;
         callback(container)})
}

function CreateOrUpdateLInks(result, movie, userId){
    {
        movie = JSON.parse(movie);
        if(result == undefined){
             InsertMovieAndCreateLink(userId, movie);
        }
        else {
            if(movie.Delete === 1){
                UserToMovie.UserToMovie.destroy({ where : { MovieId : movie.Id, UserId : userId}})
            }
            else{
            var ExistingMovieId = movie.Id
            UserToMovie.UserToMovie.findOrCreate (
                {
                    where : {
                        UserId : userId,
                        MovieId : ExistingMovieId
                    }
                })
        }
    }
    }
}

function InsertMovieAndCreateLink(userId, movie){
    var container = {}
    var createLink = function(container){
        var movieId = container.result.id;
        UserToMovie.UserToMovie.create({
        UserId : userId,
        MovieId : movieId
        })
        .then(()=> console.log("Created and linked movie"))  
    };
    MovieRepository.InsertMovie(movie.ApiId, movie.Name, createLink, container)
}

module.exports.InsertUser = InsertUser;
module.exports.UpdateUser = UpdateUser;
module.exports.DeleteUser = DeleteUser;
module.exports.GetUser = GetUser;