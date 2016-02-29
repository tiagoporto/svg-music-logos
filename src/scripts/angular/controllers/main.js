angular.module('svgBandLogosApp')
	.controller('MainCtrl', ['$scope', '$http', '$timeout' , ($scope, $http, $timeout) => {
		'use strict';


		$timeout(() => {
			$('.svg').svgToInline();
		});


		$http.get('data.json')
			.then( response => $scope.bands = response.data );
	}]);
