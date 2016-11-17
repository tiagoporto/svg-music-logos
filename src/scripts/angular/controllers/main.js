angular.module('main.controller', [])

.controller('MainCtrl', ['$scope', '$http', '$timeout', '$routeParams', '$location', '$window', ($scope, $http, $timeout, $routeParams, $location, $window) => {
    'use strict';

    $scope.search = $routeParams.search;

    $scope.download = (event, css) => {
        const svg = (new XMLSerializer()).serializeToString(event.target.previousElementSibling);

        $http.get(`css/logo/${css}`)
            .then( (response) => {
                const css = `<style>\r\n${response.data}\r</style>`;

                const content = svg.replace(/\>/, `>\r\n${css}`);

                const blob = new Blob([content], { type: 'text/plain' });
                const downloadURL = $window.URL || $window.webkitURL;

                $scope.linkDownload = downloadURL.createObjectURL(blob);
            });
    };

    $scope.lastItem = index => {
        if(index){
            $timeout(() => {
                $('.logo').svgToInline({useTriggerClass: true});
            });
        }
    };

    let url = $location.absUrl();
    url = url.replace(/\#\/.*/, '');

    $http.get(`${url}data.json`)
        .then( response => {
            let newResponse = [];
            let count = 0;

            response.data.forEach( (band) => {

                const getLogo = band.logos;

                getLogo.forEach( (logo) => {
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
