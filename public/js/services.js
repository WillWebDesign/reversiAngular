(function () {

  angular.module('reversiApp.services', [])

    .factory('reversiService', ['$http', '$q', function ($http, $q) {
      var config = {};
      config.url = "http://34.213.192.159:9000/reversi/game";
      config.token = "13e968fb-bb88-4782-b965-e71b2d87fa9c";

      function start() {
        var deferred = $q.defer();

        $http({
          url: config.url,
          method: "GET",
          params: { token: config.token }
        }).then(
          function (response) {
            deferred.resolve(response.data);
          }, function (error) {
            deferred.reject(error);
          });

        return deferred.promise;
      }

      function sendPosicion(x, y) {
        var deferred = $q.defer();

        $http({
          url: config.url + '/movements',
          method: "POST",
          params: {
            token: config.token,
            x: x - 1,
            y: y - 1
          }
        }).then(
          function (response) {
            deferred.resolve(response);
          }, function (error) {
            deferred.reject(error);
          });

        return deferred.promise;
      }

      function endGame() {
        var deferred = $q.defer();

        $http({
          url: config.url,
          method: "DELETE",
          params: { token: config.token }
        }).then(
          function (response) {
            deferred.resolve(response.data);
          }, function (error) {
            deferred.reject(error);
          });

        return deferred.promise;
      }

      return {
        start: start,
        sendPosicion: sendPosicion,
        endGame: endGame 
      };

    }]);

})();
