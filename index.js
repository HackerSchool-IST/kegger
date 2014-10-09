var Hapi = require("hapi");

var server = new Hapi.Server(8001, "localhost");
require("./db");

var alphanumExp = /^[-a-z0-9]+$/i;
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
      index: true
    }
  }
});

server.route({
  path: "/api/all",
  method: "GET",
  handler: function list(request, reply) {
    var item = require('./db/models/item.js');
    item.findAll(function (err, result) {
      if (err) {
        reply({error: "There was an error getting all the items."}).code(400);
      }
      else {
        reply(result);
      }
    })
  }
});

server.route({
  path: "/api/all/{type}",
  method: "GET",
  handler: function list(request, reply) {
    if(!request.params.type.match(alphanumExp)){
      reply({error: "Please insert a valid type"}).code(400);
    }
    var item = require('./db/models/item.js');
    item.findAllWithType(request.params.type,function (err, result) {
      if (err) {
        reply({error: "There was an error getting items."}).code(400);
      }
      else {
        reply(result);
      }
    })
  }
});

server.route({
  path: "/api/{type}",
  method: "GET",
  handler: function list(request, reply) {
    if(!request.params.type.match(alphanumExp)){
      reply({error: "Please insert a valid type"}).code(400);
    }
    var item = require('./db/models/item.js');
    item.number(request.params.type,function (err, result) {
      if (err) {
        reply({error: "We had a problem counting items, try r/counting."}).code(400);
      }
      else {
        reply({count:result});
      }
    })
  }
});

server.route({
  path: "/api/remove/{id}",
  method: "DELETE",
  handler: function create(request, reply) {
    if(!request.params.id.match(alphanumExp)){
      reply({error: "Please insert a valid id"}).code(400);
      return;
    }
    var item = require('./db/models/item.js');

    item.countWithId(request.params.id,function(err,result){
      if(err || result < 1){
        reply({error: "Item doesn't exit"}).code(400);
      }else{
        item.remv(request.params.id,function (err, result) {
          if (err) {
              reply({error: "There was an error deleting item"}).code(400);
          }
          else {
            reply({success: "Item removed"});
          }
        })
      }
    })
  }

})

server.route({
  path: "/api/{type}/{number}",
  method: "POST",
  handler: function create(request, reply) {

    if(!request.params.type.match(alphanumExp)){
      reply.status(404);
      reply({error: "Please insert a valid type"});
    }
    var itemModel = require('./db/models/item.js');
    if(isNaN(request.params.number)){
      reply.status(404);
      reply({error: "Please insert a number of "+request.params.type+" to add"});
      return;
    }
    for(var i = 0; i <request.params.number; i++){
      var item = new itemModel(request.payload);
      item.timestamp = Date.now();
      item.type = request.params.type; 
      item.save(function (err) {
        if (err) {
          reply.status(404);
          reply({error: "There was an error creating the item."});
        }       
        else {
          reply({success: "item created."});
        }
      });
    }
  }
});

