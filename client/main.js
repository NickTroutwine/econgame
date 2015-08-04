(function() {
angular.module('main', [
  'ui.router'
])

.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'pages/home.html'
    })
    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode({
     enabled: true
    });
  });
})();