var http = require("http");
var fs = require("fs");
var msg = "";

var server = http.createServer(function(request, response){
  console.log(request.url);
  var path = request.url;
  var tree = path.split("/");
  if (path === "/"){
    fs.readFile("index.html", function (err, data){
      var data = data.toString();
      response.end(data);
    });
  }
  else if (path === "/aboutmestyle.css"){
      fs.readFile("aboutmestyle.css", function (err, data){
        var data = data.toString();
        response.end(data);
    });
  }
  else if (path === "/words"){
    fs.readFile("words.html", function (err, data){
      var data = data.toString();
      response.end(data);
    });
  }
  else if (path === "/code"){
    fs.readFile("code.html", function (err, data){
      var data = data.toString();
      response.end(data);
    });
  }
  else if (path === "/contact"){
    fs.readFile("contact.html", function (err, data){
      var data = data.toString();
      response.end(data);
    });
  }
  else if (path === "/mambo"){
    fs.readFile("mambo.html", function (err, data){
      var data = data.toString();
      response.end(data);
    });
  }
  else {
    var path = request.url;
    path = path.slice(1);
    fs.readFile(path, function(err, data){
      response.end(data);
    });
  }
});
server.listen(3000);

var button = document.querySelector("button");

button.addEventListener("click", function(){
  var body = document.querySelector("body");
  body.removeChild(button);
  var video = document.createElement("iframe");
  video.src = "http://www.youtube.com/embed/zYT2WVnwiLI?rel=0?autoplay=1";
  video.width = '560';
  video.height = '315';
  document.body.appendChild(video);
});
