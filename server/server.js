var express = require('express');
var app = express(); 
var path = require('path')
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Schema = mongoose.Schema;
var wsServer = require(__dirname + '/ws-server.js');
var http = require('http');
var WebSocket = require("faye-websocket");
// var server = http.createServer();
var array = [];

mongoose.connect('mongodb://econgame:econgame@ds059692.mongolab.com:59692/econgame', function(err) {
  if(err){return err;}
});

var UserSchema = new Schema({
  username: { type: String, required: true, index: { unique: true } },
  numGuess: { type: Number, required: true},
});
var User = mongoose.model('User', UserSchema);
app.use(bodyParser.json());

app.all('/',function(req,res,next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});
app.get('/results', function (req, res){
 res.sendFile(path.join(__dirname, '/../client/index.html'));
});
app.post('/userguess', function (req, res){
  var options = {
    username: req.body.username,
  numGuess: req.body.numGuess
  };
  /*console.log('username:  ', req.body);*/
  var newUser = new User(options);
  /*console.log('new user: ', newUser);*/
  newUser.save(function (err, user){
    console.log("im in");
    if(err){
      throw err;
    }
    /*console.log('He has been saved');*/
  });
  res.json({name: newUser.username, guess: newUser.numGuess});  
console.log(newUser);
});

app.get('/userguess',function(req,res,next){
 User.find({},function(err,data){
   /*console.log('should be DB data',data);*/
   res.send(data);
 });
});
app.use(express.static('client'));
app.listen(process.env.PORT || 3000);
module.exports = app;


// // server.on('upgrade', function(request, socket, body) {
// //   if (WebSocket.isWebSocket(request)) {
// //     var ws = new WebSocket(request, socket, body);
// //     array.push(ws);
//     ws.on('message', function(event) {
//       server.broadcast(event.data);
//       // console.log(event.data);
//      //  ws.send('we got the message');
//     });

//     ws.on('close', function(event) {
//       console.log('close', event.code, event.reason);
//         var ind = array.indexOf(ws);
//         array.splice(ind,1);
//             ws = null;
//     });
//     ws.send('you get this');
//   }
// });
// server.broadcast = function(data){
//   for(var i=0; i<array.length; i++){
//     array[i].send(data);
//   }
// }

// server.listen(8000);

