var WebSocketServer = require("ws").Server;
var server = new WebSocketServer({port: 2000});
var history = [];
var clients = [];
var bannedWords = ["hubby", "moist", "moisten", "fraternity"];

server.on("connection", function(ws) {
  console.log("Client connected!"); //lets server know a client has connected
  clients.push(ws); //adds user to the list of people connected
  ws.on("close", function (){
    var x = clients.indexOf(ws);
    clients.splice(x, 1);   //when user disconnects, removes user from user list
    console.log(clients.length); //lets server know # of users in chatroom
  });
  var historyString = (history.join("\n"));
  ws.send(historyString);   //sends newly connected user chat history
  ws.on("message", function(x){
    var hash = JSON.parse(x);
    var hashDecoded = (hash.name + ": " + hash.words); //de-JSON client message
    console.log(hashDecoded);
    var bannedText = false;
    for (i=0; i<bannedWords.length; i++){
      var messageLowercase = hashDecoded.toLowerCase();
      if (messageLowercase.indexOf(bannedWords[i]) !== -1){
        bannedText = true;
        hashDecoded = (hash.name + " has been banned for using inappropriate language.");
      }
    }
    if (bannedText === true){
      clients.forEach(function(client){
        client.send(hashDecoded); //send client message to all users in chat
      });
      ws.close(); // boot user if the message contains an index in the bannedWords array
    }else{
      history.push("<li>" + hashDecoded + "</li> "); // add message from client to chat history
      clients.forEach(function(client){
        client.send(hashDecoded); //send client message to all users in chat
      });
    }
  });
});
