/*!	SVG Music Logos
*	https://github.com/tiagoporto/svg-music-logos
*	Copyright (c) 2016 Tiago Porto (http://tiagoporto.com)
*	Released under the MIT license
*/

'use strict';

var app = angular.module('svgMusicLogosApp', ['ngRoute']);

app.config(['$routeProvider', function ($routeProvider) {
    var url = window.location.href;
    url = url.replace(/\#\/.*/, '');

    $routeProvider.when('/', {
        templateUrl: url + 'templates/logos.html',
        controller: 'MainCtrl'
    }).when('/svg-music-logos', {
        templateUrl: url + 'templates/logos.html',
        controller: 'MainCtrl'
    }).when('/svg-music-logos/:search', {
        templateUrl: url + 'templates/logos.html',
        controller: 'MainCtrl'
    }).when('/:search', {
        templateUrl: url + 'templates/logos.html',
        controller: 'MainCtrl'
    }).otherwise({ redirectTo: '/' });
}]);

app.controller('MainCtrl', ['$scope', '$http', '$timeout', '$routeParams', '$location', function ($scope, $http, $timeout, $routeParams, $location) {
    'use strict';

    $scope.search = $routeParams.search;

    $scope.lastItem = function (index) {
        if (index) {
            $timeout(function () {
                $('.logo').svgToInline({ useTriggerClass: true });
            });
        }
    };

    var url = $location.absUrl();
    url = url.replace(/\#\/.*/, '');

    $http.get(url + 'data.json').then(function (response) {

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