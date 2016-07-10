var app = angular.module('svgMusicLogosApp', ['ngRoute']);

app.config(['$routeProvider', '$locationProvider', ($routeProvider, $locationProvider) => {
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

    // remove o # da url
    if(window.history && window.history.pushState){
        // to know more about setting base URL visit: https://docs.angularjs.org/error/$location/nobase
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    }
}]);
