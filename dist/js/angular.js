/*!	SVG Music Logos v0.1.0
*	https://github.com/tiagoporto/svg-music-logos
*	Copyright (c) 2016 Tiago Porto (http://tiagoporto.com)
*	Released under the MIT license
*/

'use strict';

angular.module('svgBandLogosApp', []);

angular.module('svgBandLogosApp').controller('MainCtrl', ['$scope', '$http', '$timeout', function ($scope, $http, $timeout) {
	'use strict';

	$scope.lastItem = function (index) {
		if (index) {
			$timeout(function () {
				$('.logo').svgToInline({ useTriggerClass: true });
			});
		}
	};

	$http.get('data.json').then(function (response) {

		var newResponse = [];
		var count = 0;

		response.data.forEach(function (band) {

			var getLogo = band.logos;

			getLogo.forEach(function (logo) {
				newResponse[count] = {};
				newResponse[count].name = band.name;
				newResponse[count].link = band.link;
				newResponse[count].origin = band.origin;
				newResponse[count].style = band.style;
				newResponse[count].logo = logo;

				count += 1;
			});
		});

		$scope.bands = newResponse;
	});
}]);