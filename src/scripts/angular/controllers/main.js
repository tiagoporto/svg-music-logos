app.controller('MainCtrl', ['$scope', '$http', '$timeout', '$routeParams', '$location' , ($scope, $http, $timeout, $routeParams, $location) => {
    'use strict';

    $scope.search = $routeParams.search;

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
                    newResponse[count].logo = logo;

                    count += 1;
                });
            });

            $scope.bands = newResponse;
        });
}]);
