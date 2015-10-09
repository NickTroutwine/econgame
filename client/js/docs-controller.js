angular.module('main').controller('DocsController', DocsController);
DocsController.$inject = ['$http', '$scope']; 

function DocsController($http, $scope) { 
var self = this;
// var dataArray;


	this.getDocs  = function(){  
	  var dataArray= [];  
	  var numArray = [];
	  var ansArray = [];
	  var results;
	  /*console.log(this.newUser)*/
	window.addEventListener('load', function(){ 
  var ws = new WebSocket('ws://localhost:8030');
  ws.addEventListener('open', function(){
        ws.send("whats up dawg");
        console.log("message sent");
  })
    
  ws.addEventListener('message',function(event){
      console.log(event.data);
    })
})
	    $http.get('/userguess').success(function(data, status, headers, config){
	    	dataArray = data;
		  	for(var i=0;i<dataArray.length;i++){
		  		numArray.push(dataArray[i].numGuess);
		  		// console.log("numArray",numArray);
		  	}
		  	var sum = 0;
		  	for (var i =0;i<numArray.length;i++){
		  		sum += numArray[i]
		  	}
		    sum = Math.round((sum/data.length)/2);
		  	// console.log("sum",sum);
		  	for(var i=0;i<numArray.length;i++){

		  		ansArray.push(Math.abs(numArray[i]-sum));
		  		// console.log("ans",ansArray);
		  	}
 				var answer = ansArray.indexOf(Math.min.apply(Math, ansArray));
 				// console.log("answer",answer);
 				// console.log(dataArray);
	    
		  	for(var i=0;i<dataArray.length;i++){
		  		if(i===answer){
		  			var winObj = dataArray[i];
		  			var winnerName =(winObj.username);
		  			var winnerGuess = (winObj.numGuess);
		  			// console.log(winnerName, winnerGuess);
		  			var players = dataArray.length
		  		}
		  	}
		  	$scope.players = players;
		  	$scope.sum = sum;
		  	$scope.winnerName = winnerName;
		  	$scope.winnerGuess = winnerGuess;
		})
		  			  	
	}
}


