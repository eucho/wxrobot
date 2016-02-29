var http = require("http");
var url = require("url");
var requestHandlers = require("./requestHandlers");
var router = require("./router");

function start() {
  function onRequest(request, response) {
    console.log(request.url);
    var postData = "";
    request.addListener("data", function(postDataChunk) {
      postData += postDataChunk;
      console.log("Received POST data chunk '"+
      postDataChunk + "'.");
    });
    request.addListener("end", function() {
    router.route(request, response, postData);
    });

  }
  http.createServer(onRequest).listen(8888);
}

exports.start = start;
