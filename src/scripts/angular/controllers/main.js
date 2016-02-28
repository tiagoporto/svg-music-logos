angular.module('svgBandLogosApp')
  .controller('MainCtrl', function ($scope, $http) {

    $http.get("data.json")
      .then(function(response) {
        $scope.bands = response.data;
      });
  });
