(function () {

  angular.module('reversiApp.controllers', [])
    .controller('HomeController', ['$rootScope', '$scope', '$window', 'reversiService', function ($rootScope, $scope, $window, reversiService) {
      $rootScope.title = "Home";
      $scope.spinner = false;
      $scope.inGame = false;
      $scope.titleAlert = '';
      $scope.textAlert = '';
      $scope.turno = '';
      $scope.t = '';
      $scope.endGame = 'IN_COURSE';

      $scope.start_game = function start_game() {
        $scope.spinner = !$scope.spinner;
        $scope.inGame = !$scope.inGame;

        reversiService
          .start()
          .then(function (data) {
            console.log(data);
            $scope.turno = data.currentPlayer === 'WHITE' ? 'Turno Blanco' : 'Turno Negro';
            $scope.t = data.currentPlayer;

            document.getElementById('tablero').classList.add(data.currentPlayer === 'WHITE' ? 'box-shadow-white' : 'box-shadow-black');
            data.boardRows.forEach(function (elX, i) {
              elX.forEach(function (elY, j) {
                var x = i + 1;
                var y = j + 1;
                var id = x + '-' + y;
                if (elY === '_') {
                  var elem = document.getElementById(id);
                  elem.classList.add('celdasActive');

                } else if (elY === 'W') {
                  var elem = document.getElementById(id + '-int');
                  var elemP = document.getElementById(id);
                  elem.classList.remove('circleBlack');
                  elem.classList.add('circleWhite');
                  elemP.classList.remove('celdasActive');

                } else if (elY === 'B') {
                  var elem = document.getElementById(id + '-int');
                  var elemP = document.getElementById(id);
                  elem.classList.remove('circleWhite');
                  elem.classList.add('circleBlack');
                  elemP.classList.remove('celdasActive');

                }
                else { console.log('Error'); }
              });
            });
            $scope.spinner = !$scope.spinner;
          })
          .catch(function name(error) {
            console.log(error);
          })
      }

      $scope.closeAlert = function () {
        document.getElementById('alert').classList.remove('alertActive');
        if ($scope.endGame != 'IN_COURSE') {
          reversiService
            .endGame()
            .then(function (response) {
              console.log(response);
              $window.location.reload();
            })
            .catch(function (error) {
              console.log(error);
            })
        }
      }

      $scope.clickCelda = function clickCelda(id) {
        posiciones = id.split('-');
        $scope.spinner = !$scope.spinner;
        reversiService
          .sendPosicion(posiciones[1], posiciones[0])
          .then(function (data) {
            if (data.status === 204) {
              reversiService
                .start()
                .then(function (data) {

                  $scope.endGame = data.gameState;

                  if (data.gameState != 'IN_COURSE') {
                    $scope.titleAlert = 'Hola!';
                    $scope.textAlert = 'Juego terminado :' + (data.blackCount > data.whiteCount ? 'Gana el Negro' : 'Gana el Blanco');
                    document.getElementById('alert').classList.add('alertActive');
                  }
                  $scope.turno = data.currentPlayer === 'WHITE' ? 'Turno Blanco' : 'Turno Negro';
                  $scope.t = data.currentPlayer;

                  document.getElementById('tablero').classList.add(data.currentPlayer === 'WHITE' ? 'box-shadow-white' : 'box-shadow-black');
                  document.getElementById('tablero').classList.remove(data.currentPlayer === 'WHITE' ? 'box-shadow-black' : 'box-shadow-white');

                  $scope.spinner = !$scope.spinner;
                  console.log(data);
                  data.boardRows.forEach(function (elX, i) {
                    elX.forEach(function (elY, j) {
                      var x = i + 1;
                      var y = j + 1;
                      var id = x + '-' + y;
                      if (elY === '_') {
                        var elem = document.getElementById(id);
                        elem.classList.add('celdasActive');
                      } else if (elY === 'W') {
                        var elem = document.getElementById(id + '-int');
                        var elemP = document.getElementById(id);
                        elem.classList.remove('circleBlack');
                        elem.classList.add('circleWhite');
                        elemP.classList.remove('celdasActive');

                      } else if (elY === 'B') {
                        var elem = document.getElementById(id + '-int');
                        var elemP = document.getElementById(id);
                        elem.classList.remove('circleWhite');
                        elem.classList.add('circleBlack');
                        elemP.classList.remove('celdasActive');

                      }
                      else { console.log('Error'); }
                    });
                  });
                })
                .catch(function name(error) {
                  console.log(error);
                })
            }
          })
          .catch(function name(error) {
            $scope.spinner = !$scope.spinner;
            switch (error.status) {
              case 400:
                $scope.titleAlert = 'Error!';
                $scope.textAlert = 'El movimiento es invalido.';
                document.getElementById('alert').classList.add('alertActive');
                break;
              case 401:
                $scope.titleAlert = 'Error!';
                $scope.textAlert = 'Error en el servidor, intentelo mas tarde.';
                document.getElementById('alert').classList.add('alertActive');
                break;
              case 409:
                $scope.titleAlert = 'Error!';
                $scope.textAlert = 'El juego a terminado o la posicion ya esta ocupada.';
                document.getElementById('alert').classList.add('alertActive');
                break;

              default:
                console.log(error);
                break;
            }
          })
      }
    }]);
})();
