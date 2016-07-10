/*!	SVG Music Logos v0.1.0
*	https://github.com/tiagoporto/svg-music-logos
*	Copyright (c) 2016 Tiago Porto (http://tiagoporto.com)
*	Released under the MIT license
*/

'use strict';

var app = angular.module('svgMusicLogosApp', ['ngRoute']);

app.config(function ($routeProvider, $locationProvider) {
    'use strict';

    $routeProvider.when('/', {
        templateUrl: 'templates/logos.html',
        controller: 'MainCtrl'
    }).when('/:search', {
        templateUrl: 'templates/logos.html',
        controller: 'MainCtrl'
    }).otherwise({ redirectTo: '/' });

    // remove o # da url
    if (window.history && window.history.pushState) {
        // to know more about setting base URL visit: https://docs.angularjs.org/error/$location/nobase

        // if you don't wish to set base URL then use this
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    }
});

app.controller('MainCtrl', ['$scope', '$http', '$timeout', '$routeParams', function ($scope, $http, $timeout, $routeParams) {
    'use strict';

    $scope.search = $routeParams.search;

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