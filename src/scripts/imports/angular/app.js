angular.module('svgMusicLogosApp', [
  'ngRoute',
  'main.controller'
])

  .config(['$routeProvider', '$compileProvider', ($routeProvider, $compileProvider) => {

    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|blob):/)

    let url = window.location.href
    url = url.replace(/#\/.*/, '')

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
