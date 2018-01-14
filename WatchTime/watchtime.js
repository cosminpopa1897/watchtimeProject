var env = process.env.NODE_ENV || "development";
var config = require('./config/config.json')[env];
var express = require('express');
var util = require('util');
var http = require('http');
var https = require('https');
var request = require('request');
var MovieRepo = require('./Repository/MovieRepository');
var sqlConnection = require('./Repository/SqlConnection');
var UserRepo = require('./Repository/UserRepository');
var MovieEntity = require('./Domain/Movie')
var UserViewModel = require("./Domain/Models/UserViewModel");
var MovieViewModel = require("./Domain/Models/MovieViewModel");
var bodyParser = require("body-parser");
sqlConnection.sequelize.sync();
var movieUrl = "https://api.themoviedb.org/3/movie/124685?api_key=1157e2291fbc81e9dbc99fe9a5f17e6b&language=en-US"
var watchTimeServer = express();

watchTimeServer.use(function (req, res, next) {
    
        // Website you wish to allow to connect
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

        res.setHeader("Access-Control-Allow-Credentials", "true");
    
        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    
        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    
        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', true);

        // Pass to next layer of middleware
        next();
    });

    watchTimeServer.use( bodyParser.json() );       // to support JSON-encoded bodies
    watchTimeServer.use(bodyParser.urlencoded({     // to support URL-encoded bodies
      extended: true
    }));


watchTimeServer.get('/User', function(req, res){
    var query = req.query;
    container.res = res;
    container.username = query.username;
    UserRepo.GetUser(container.username, ReturnUser, container);
})

watchTimeServer.post('/CreateUser', function(req, res){
    var query = req.body
    if(query.movies == undefined)
        var movies = [];
    UserRepo.InsertUser(query.username, query.firstName, query.lastName, query.email, movies)    
})



watchTimeServer.post('/DeleteUser', function(req, res){
    var query = req.query;
    var container = {}
    container.res = res;
    container.userId = query.userId;
    UserRepo.DeleteUser(container.userId, ()=>container.res.send("Deleted user " + container.userId), container );
})
var container = {};


function ReturnUser(container){
    if(container.result == undefined){
        container.res.json(null);
        return;
    }
    var movies = container.result.movies;
    var movieModels = MovieViewModel.MapEntityArrayToViewModelArray(movies);
  
    var user = new UserViewModel.UserViewModel(container.result.Id, 
                                                container.result.Username, 
                                                container.result.FirstName, 
                                                container.result.LastName, 
                                                container.result.Email,
                                                movieModels
                                                );
    container.res.json(user);
}




var movies = [{Id :31, ApiId : 32, Name: "Star Wars", Delete : 0}, 
              {Id :34 , ApiId : 7, Name: "Fight Club", Delete : 0}, 
              {Id : 36, ApiId : 3, Name: "Good Fellas", Delete : 0}];


UserRepo.InsertUser("radu123", "radu", "popescu", "rp@mail.ro", movies);


var port =  3030;

var router = express.Router();
watchTimeServer.listen(port, function(){
    console.log('Running on Port: ' + port);
})

