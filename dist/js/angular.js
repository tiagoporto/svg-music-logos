/*!	SVG Music Logos v0.1.0
*	https://github.com/tiagoporto/svg-music-logos
*	Copyright (c) 2016 Tiago Porto (http://tiagoporto.com)
*	Released under the MIT license
*/

'use strict';

angular.module('svgBandLogosApp', []);

angular.module('svgBandLogosApp').controller('MainCtrl', ['$scope', '$http', '$timeout', function ($scope, $http, $timeout) {
	'use strict';

	$timeout(function () {
		$('.svg').svgToInline();
	});

	$http.get('data.json').then(function (response) {
		return $scope.bands = response.data;
	});
}]);