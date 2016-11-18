angular.module('main.controller', ['ngFileSaver'])

.controller('MainCtrl', ['$scope', '$http', '$timeout', '$routeParams', '$location', '$window', 'FileSaver', 'Blob', ($scope, $http, $timeout, $routeParams, $location, $window, FileSaver, Blob) => {
    'use strict';

    let url = $location.absUrl();
    url = url.replace(/\#\/.*/, '');
    $scope.search = $routeParams.search;

    $scope.download = (event, css, fileName) => {
        const svg = (new XMLSerializer()).serializeToString(event.target.previousElementSibling);

        const save = (content, file = fileName) => {
            content = new Blob([content], { type: 'text/plain' });

            FileSaver.saveAs(content, file);
        };

        if (css) {
            $http.get(`${url}css/logo/${css}`)
                .then(response => {
                    const cssResponse = `<style>\r\n${response.data}\r</style>`;
                    const content = svg.replace(/\>/, `>\r\n${cssResponse}`);

                    save(content);
                });
        } else {
            save(svg);
        }

        typeof ga === 'function' && ga('send', 'event', 'download', 'click', fileName);
    };

    $scope.lastItem = index => {
        if(index){
            $timeout(() => {
                $('.logo').svgToInline({useTriggerClass: true});
            });
        }
    };


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
