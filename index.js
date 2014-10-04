var Hapi = require("hapi");

var server = new Hapi.Server(8001, "localhost");
require("./db");

server.start(function(){
	console.log("Hapi server started @", server.info.uri);
});



server.route({
    path: "/{path*}",
    method: "GET",
    handler: {
        directory: {
            path: "./public",
            listing: false,
            index: false
        }
    }
});

server.route({
    path: "/",
    method: "GET",
    handler: function(request, reply) {
        reply("Hello");
    }
});


server.route({
    path: "/keg",
    method: "GET",
    handler: function list(request, reply) {
        var keg = require('./db/models/keg.js');

      keg.count(gotkeg);

      function gotkeg(err, result) {
        if (err) {
          reply({error: "There was an error getting all the hackers."});
        }
        else {
          reply(result);
        }
      }

    }
});

server.route({
    path: "/keg/{number}",
    method: "POST",
    handler: function create(request, reply) {

    var kegModel = require('./db/models/keg.js');
    for(var i = 0; i <request.params.number; i++){
        var keg = new kegModel(request.payload, Date.now());

      keg.save(function (err) {
        if (err) {
          reply({error: "There was an error creating the keg."});
        }       
        else {
          keg.timestamp = Date.now()
          reply({
            success: "keg created.",
          });
        }
      });
      }
    }
});


server.route({
    path: "/ticket",
    method: "GET",
    handler: function list(request, reply) {
        var ticket = require('./db/models/ticket.js');

      ticket.count(gotticket);

      function gotticket(err, result) {
        if (err) {
          reply({error: "There was an error getting all the hackers."});
        }
        else {
          reply(result);
        }
      }

    }
});

server.route({
    path: "/ticket/{number}",
    method: "POST",
    handler: function create(request, reply) {

    var ticketModel = require('./db/models/ticket.js');
    for(var i = 0; i <request.params.number; i++){
        var ticket = new ticketModel(request.payload, Date.now());

      ticket.save(function (err) {
        if (err) {
          reply({error: "There was an error creating the ticket."});
        }       
        else {
          ticket.timestamp = Date.now()
          reply({
            success: "ticket created.",
          });
        }
      });
      }
    }
});


server.route({
    path: "/beer",
    method: "GET",
    handler: function list(request, reply) {
        var beer = require('./db/models/beer.js');

      beer.count(gotbeer);

      function gotbeer(err, result) {
        if (err) {
          reply({error: "There was an error getting all the hackers."});
        }
        else {
          reply(result);
        }
      }

    }
});

server.route({
    path: "/beer/{number}",
    method: "POST",
    handler: function create(request, reply) {

    var beerModel = require('./db/models/beer.js');
    for(var i = 0; i <request.params.number; i++){
        var beer = new beerModel(request.payload, Date.now());

      beer.save(function (err) {
        if (err) {
          reply({error: "There was an error creating the beer."});
        }       
        else {
          beer.timestamp = Date.now()
          reply({
            success: "beer created.",
          });
        }
      });
      }
    }
});

