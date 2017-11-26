import angular from 'angular'
import 'angular-route'
import 'angular-file-saver'

const app = angular.module('svgMusicLogosApp', [
  'ngRoute',
  'main.controller'
])

app.config(['$routeProvider', '$compileProvider', '$locationProvider', ($routeProvider, $compileProvider, $locationProvider) => {
  $locationProvider.html5Mode(true)

  $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|blob):/)

  let url = window.location.href
  url = url.replace(/#!\/.*/, '')

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

    .otherwise({redirectTo: '/'})
}])

export default app
