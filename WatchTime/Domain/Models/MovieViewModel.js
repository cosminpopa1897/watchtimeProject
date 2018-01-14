function MovieViewModel(id, apiId, name){
    this.Id = id,
    this.ApiId = apiId,
    this.Name = name
}

function MapEntityArrayToViewModelArray(movies){
    var models = []
    movies.forEach(function(movie) {
        var model = new MovieViewModel(movie.id, movie.ApiId, movie.Name);
        models.push(model);
    }, this);
    return models;
}
module.exports.MovieViewModel = MovieViewModel
module.exports.MapEntityArrayToViewModelArray = MapEntityArrayToViewModelArray