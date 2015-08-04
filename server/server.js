var express = require('express');
var app = express(); 
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Schema = mongoose.Schema;
mongoose.connect('mongodb://stustan:stustan@ds063809.mongolab.com:63809/student-auth-app', function(err) {
  if(err){return err;}});

var UserSchema = new Schema({
  username: { type: String, required: true, index: { unique: true } },
  numGuess: { type: Number, required: true},
});
var User = mongoose.model('User', UserSchema);

app.all('/',function(req,res,next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});
app.post('/userguess', function (req, res){
  var options = {
    username: req.body.username,
	numGuess: req.body.numGuess
  };
  var newUser = new User(options);
  console.log('new user: ', newUser);
  newUser.save(function (err){
  	if(err){
  	  throw err;
  	}
  	console.log('He has been saved');
  });
  res.json({name: newUser.username, guess: newUser.numGuess});
});


app.use(express.static('client'));
app.listen(process.env.PORT || 3000);
module.exports = app;