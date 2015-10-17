var WebSocket = require("faye-websocket");
var http = require("http");
var server = http.createServer();
var array = [];
server.on('upgrade', function(request, socket, body) {
  if (WebSocket.isWebSocket(request)) {
    var ws = new WebSocket(request, socket, body);
    array.push(ws);
    ws.on('message', function(event) {
      server.broadcast(event.data);
      console.log(event.data);
      ws.send(event.data);
    });
    ws.on('close', function(event) {
      console.log('close', event.code, event.reason);
        var ind = array.indexOf(ws);
        array.splice(ind,1);
            ws = null;
    });
    // ws.send('you get this');
  }
});
server.broadcast = function(data){
  for(var i=0; i<array.length; i++){
    array[i].send(data);
  }
}
server.listen(8000);