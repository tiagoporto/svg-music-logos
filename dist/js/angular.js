/*!	SVG Music Logos
*	https://github.com/tiagoporto/svg-music-logos
*	Copyright (c) 2016-2017 Tiago Porto (http://tiagoporto.com)
*	Released under the MIT license
*/

'use strict';

angular.module('svgMusicLogosApp', ['ngRoute', 'main.controller']).config(['$routeProvider', '$compileProvider', function ($routeProvider, $compileProvider) {
    'use strict';

    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|blob):/);

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

angular.module('main.controller', ['ngFileSaver']).controller('MainCtrl', ['$scope', '$http', '$timeout', '$routeParams', '$location', '$window', 'FileSaver', 'Blob', function ($scope, $http, $timeout, $routeParams, $location, $window, FileSaver, Blob) {
    'use strict';

    var url = $location.absUrl();
    url = url.replace(/\#\/.*/, '');
    $scope.search = $routeParams.search;

    $scope.download = function (event, css, fileName) {
        var svg = new XMLSerializer().serializeToString(event.target.parentElement.previousElementSibling);

        var save = function save(content) {
            var file = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : fileName;

            content = new Blob([content], { type: 'text/plain' });

            FileSaver.saveAs(content, file);
        };

        if (css) {
            $http.get(url + 'css/logo/' + css).then(function (response) {
                var cssResponse = '<style>\r\n' + response.data + '\r</style>';
                var content = svg.replace(/\>/, '>\r\n' + cssResponse);

                save(content);
            });
        } else {
            save(svg);
        }

        typeof ga === 'function' && ga('send', 'event', 'download', 'click', fileName);
    };

    $scope.lastItem = function (index) {
        if (index) {
            $timeout(function () {
                $('.logo').svgToInline({ useTriggerClass: true });
            });
        }
    };

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