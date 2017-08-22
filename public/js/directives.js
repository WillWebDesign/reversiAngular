(function () {

  angular.module('reversiApp.directives', [])
    .directive('tablero', function () {
      return {
        restrict: 'E',
        templateUrl: 'partials/tablero.html'
      };
    }).directive('alert', function () {
      return {
        restrict: 'E',
        templateUrl: 'partials/alert.html'
      };
    });
})();
