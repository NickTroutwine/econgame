angular.module('main').controller('NumController', NumController);
NumController.$inject = ['$http', '$state'];


function NumController($http, $state) { 
  // console.log("what it is:  ", $state);
  var self = this;
  this.newUser = {};
  
  this.addUser  = function(){   
    $http.post('/userguess', this.newUser).success(function(data, status, headers, config){
    self.newUser = {username: '', numGuess: ''};
        console.log("sending")

    });
    $state.go('results');
  };
}