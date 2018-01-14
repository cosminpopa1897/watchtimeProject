var MovieEntity = require("../Domain/Movie");
var SQL = require("./SqlConnection");
var UserToMovieEntity = require("../Domain/UserToMovie");

function InsertMovie(apiId, Name, callback, container){
    MovieEntity.Movie.create({ApiId : apiId, Name : Name})
            .then((result)=>{
                            console.log(result);
                            container.result = result.dataValues; 
                             callback(container)})
 }

function DeleteMovie(id){
  UserToMovieEntity.UserToMovie.destroy({
      where : { MovieId : id}
  });
  MovieEntity.Movie.destroy({
      where : { Id : id}
  }).then(()=>console.log("Deleted row in movies"))
}

function UpdateMovie(id, apiId, name){
    MovieEntity.Movie.update({
        ApiId : apiId,
        Name : name
    }
    ,
    {
        where : {Id :id}
    })
}

function GetMovie(id, callback, container){
    return MovieEntity.Movie.findById(id)
            .then(result => 
                {container.result = result; 
                 callback(result)
                })
}

function GetAllMovies(callback, container){
    MovieEntity.Movie.findAll({
        raw : true
    })
        .then(result=> {
            
            container.result = JSON.stringify(result);
            callback(container);
        }
    )
}



module.exports.InsertMovie = InsertMovie;
module.exports.DeleteMovie = DeleteMovie;
module.exports.UpdateMovie = UpdateMovie;
module.exports.GetMovie = GetMovie;
module.exports.GetAllMovies = GetAllMovies;