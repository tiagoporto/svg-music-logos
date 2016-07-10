var app = angular.module('svgMusicLogosApp', ['ngRoute']);

app.config( function($routeProvider, $locationProvider) {
    'use strict';

    $routeProvider
        .when('/', {
            templateUrl: 'templates/logos.html',
            controller: 'MainCtrl'
        })

        .when('/:search', {
            templateUrl: 'templates/logos.html',
            controller: 'MainCtrl'
        })

        .otherwise ({ redirectTo: '/' });

    // remove o # da url
    if(window.history && window.history.pushState){
     // to know more about setting base URL visit: https://docs.angularjs.org/error/$location/nobase

     // if you don't wish to set base URL then use this
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    }
});
