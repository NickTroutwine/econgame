var express = require('express');
var app = express(); 
var path = require('path')
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Schema = mongoose.Schema;
var ws = require('ws').Server,
   express = require('express'),
   wss = new ws({port: 8030}),
   wsarr = [];

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
    // console.log("im in");
    if(err){
      throw err;
    }
    /*console.log('He has been saved');*/
  });
  res.json({name: newUser.username, guess: newUser.numGuess});  
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

//  ws.on("connection", function(ws){
//   wsarr.push(ws);
//   for(var i=0; i< wsarr.length: i++){
//     app.get('/userguess', function(req, res, next){
//       User.find({},function(err,data){
//         res.send(data);
//       })
//     })
//   }
// });

// var ws = require('ws').Server,
//    express = require('express'),
//    wss = new ws({port: 8010}),
//    app = express(),
//    wsarr = [];
// wss.on("connection", function(ws){
//  wsarr.push(ws);
//  ws.send("from ws server");
//  ws.on("message", function(msg) {
//    for(var i = 0; i < wsarr.length; i++) {
//    wsarr[i].send("message recieved "+msg);
//  }
//  })
// });