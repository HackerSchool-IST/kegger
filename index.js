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
    path: "/api/{type}",
    method: "GET",
    handler: function list(request, reply) {
      var item = require('./db/models/item.js');
      item.number(request.params.type,function (err, result) {
        if (err) {
          reply({error: "There was an error getting all the hackers."});
        }
        else {
          reply(result);
        }
      })
    }
});

server.route({
    path: "/api/{type}/{number}",
    method: "POST",
    handler: function create(request, reply) {

    var itemModel = require('./db/models/item.js');
   for(var i = 0; i <request.params.number; i++){
      var item = new itemModel(request.payload);
      item.timestamp = Date.now();
      item.type = request.params.type; 
      item.save(function (err) {
        if (err) {
          reply({error: "There was an error creating the item."});
        }       
        else {
          reply({success: "item created."});
        }
      });
      }
    }
});

