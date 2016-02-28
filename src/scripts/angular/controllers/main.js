angular.module('svgBandLogosApp')
	.controller('MainCtrl', ['$scope', '$http', function ($scope, $http) {
		$http.get("data.json")
		.then(function(response) {
			$scope.bands = response.data;
		});
	}]);
