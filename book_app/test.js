var http = require("http");
var fs = require("fs");
var msg = "";

var server = http.createServer(function(request, response){
  console.log(request.url);
  var path = request.url;
  var tree = path.split("/");
  if (path === "/"){
      fs.readFile("frankenstein.txt", function (err, data){
        var data = data.toString();
        data = data.replace("\n", "<br>")
        response.end(data);
      });
    }
});
server.listen(3000);
