(function() {
angular.module('main', [
  'ui.router'
])

.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'pages/home.html',
      controller: "NumController",
      controllerAs: "numCtrl"
    });
    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode({
     enabled: true
    });
  });
})();