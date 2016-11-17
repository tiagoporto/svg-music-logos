/*!	SVG Music Logos
*	https://github.com/tiagoporto/svg-music-logos
*	Copyright (c) 2016 Tiago Porto (http://tiagoporto.com)
*	Released under the MIT license
*/

'use strict';

angular.module('svgMusicLogosApp', ['ngRoute', 'main.controller']).config(['$routeProvider', function ($routeProvider) {
    'use strict';

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
}]).config(['$compileProvider', function ($compileProvider) {
    'use strict';

    $compileProvider.aHrefSanitizationWhitelist(/^\s*(|blob|):/);
}]);

angular.module('main.controller', []).controller('MainCtrl', ['$scope', '$http', '$timeout', '$routeParams', '$location', '$window', function ($scope, $http, $timeout, $routeParams, $location, $window) {
    'use strict';

    $scope.search = $routeParams.search;

    $scope.download = function (event, css) {
        var svg = new XMLSerializer().serializeToString(event.target.previousElementSibling);

        $http.get('css/logo/' + css).then(function (response) {
            var css = '<style>\r\n' + response.data + '\r</style>';

            var content = svg.replace(/\>/, '>\r\n' + css);

            var blob = new Blob([content], { type: 'text/plain' });
            var downloadURL = $window.URL || $window.webkitURL;

            $scope.linkDownload = downloadURL.createObjectURL(blob);
        });
    };

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
                newResponse[count].css = band.css;
                newResponse[count].logo = logo;

                count += 1;
            });
        });

        $scope.bands = newResponse;
    });
}]);