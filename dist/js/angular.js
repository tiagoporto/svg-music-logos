/*!	SVG Music Logos v0.1.0
*	https://github.com/tiagoporto/svg-music-logos
*	Copyright (c) 2016 Tiago Porto (http://tiagoporto.com)
*	Released under the MIT license
*/


angular
  .module('svgBandLogosApp', []);

angular.module('svgBandLogosApp')
  .controller('MainCtrl', function ($scope, $http) {

    $http.get("data.json")
      .then(function(response) {
        $scope.bands = response.data;
      });
  });
