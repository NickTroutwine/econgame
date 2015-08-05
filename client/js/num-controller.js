angular.module('main').controller('NumController', NumController);
NumController.$inject = ['$http'];

function NumController($http ) { 
  this.newUser = {};

  this.addUser  = function(){   
    var self = this;
    console.log(this.newUser)
    $http.post('/userguess', this.newUser).success(function(data, status, headers, config){
    self.newUser = {username: '', numGuess: 0};
    });  
  };
}