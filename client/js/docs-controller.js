angular.module('main').controller('DocsController', DocsController);
DocsController.$inject = ['$http', '$scope'];

function DocsController($http, $scope) { 
var self = this;
// var dataArray;
	this.getDocs  = function(){   
	  var numArray = [];
	  var results;
	  /*console.log(this.newUser)*/
	    $http.get('/userguess').success(function(data, status, headers, config){
		  	for(var i=0;i<data.length;i++){
		  		numArray.push(data[i].numGuess);
		  		console.log("numArray",numArray);
		  	}
		  	var sum = 0;
		  	for (var i =0;i<numArray.length;i++){
		  		sum += numArray[i]
		  	}
		    sum = Math.round((sum/data.length)/2);
		  
		  	console.log(sum);
	    })
		  	
	}
}

