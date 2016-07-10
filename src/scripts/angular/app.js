var app = angular.module('svgMusicLogosApp', ['ngRoute']);

app.config(['$routeProvider', ($routeProvider) => {
    let url = window.location.href;
    url = url.replace(/\#\/.*/, '');

    $routeProvider
        .when('/', {
            templateUrl: `${url}templates/logos.html`,
            controller: 'MainCtrl'
        })

        .when('/svg-music-logos', {
            templateUrl: `${url}templates/logos.html`,
            controller: 'MainCtrl'
        })

        .when('/svg-music-logos/:search', {
            templateUrl: `${url}templates/logos.html`,
            controller: 'MainCtrl'
        })

        .when('/:search', {
            templateUrl: `${url}templates/logos.html`,
            controller: 'MainCtrl'
        })

        .otherwise ({ redirectTo: '/' });
}]);
