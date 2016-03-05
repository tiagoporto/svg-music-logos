angular.module('svgBandLogosApp')
	.controller('MainCtrl', ['$scope', '$http', '$timeout' , ($scope, $http, $timeout) => {
		'use strict';


		$scope.lastItem = index => {
			if(index){
				$timeout(() => {
					$('.svg').svgToInline();
				});
			}
		};


		$http.get('data.json')
			.then( response => {

				let newResponse = [];
				let count = 0;

				response.data.forEach( (band, bandIndex) => {

					const getLogo = band.logos;

					getLogo.forEach( (logo, logoIndex) => {
						newResponse[count] = {};
						newResponse[count].name = band.name;
						newResponse[count].link = band.link;
						newResponse[count].origin = band.origin;
						newResponse[count].style = band.style;
						newResponse[count].logo = logo;

						++count;
					});
				});

				$scope.bands = newResponse;
			});
	}]);
