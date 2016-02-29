var requestHandlers = require("./requestHandlers");
var url = require("url");

var handles = {
  "/" : requestHandlers.handshake
};

function route(request, response, postData) {
  var pathname = url.parse(request.url).pathname;
  var requestHandler = handles[pathname];
  if (typeof(requestHandler) == "function") {
    requestHandler(request, response, postData);
  }
  else {
    response.writeHead(404);
    response.write("Invalid request!");
    response.end();
  }
}

exports.route = route;
