angular.module('main').controller('NumController', NumController);
NumController.$inject = ['$http', '$state'];

function NumController($http, $state) { 
  console.log("what it is:  ", $state);
  this.newUser = {};
  var self = this;
  this.addUser  = function(){   
    $http.post('/userguess', this.newUser).success(function(data, status, headers, config){
    self.newUser = {username: '', numGuess: ''};
    });
    $state.go('results');
  };
}