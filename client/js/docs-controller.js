angular.module('main').controller('DocsController', DocsController);
NumController.$inject = ['$http'];

function DocsController($http) { 
 

 this.getDocs  = function(){   
   var self = this;
   console.log(this.newUser)
   $http.get('/docs').success(function(data, status, headers, config){
      query.find();
      console.log(query.find());
   }); 
 };
}
// query.find({ name: 'Los Pollos Hermanos' }).find(callback)
// http://mongoosejs.com/docs/api.html#model_Model.find