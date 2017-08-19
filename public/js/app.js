(function () {

  var app = angular.module('reversiApp', [
    'ngRoute',
    'reversiApp.controllers',
    'reversiApp.directives',
    'reversiApp.filters',
    'reversiApp.services'
  ]);

  app.config(['$routeProvider', function ($routeProvider) {

    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeController'
      })
      .otherwise({
        redirectTo: '/'
      });

  }]);

})();
