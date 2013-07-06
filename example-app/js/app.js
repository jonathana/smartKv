'use strict';
// Declare app level module which depends on filters, and services
var app = angular.module('myApp', ['smartKv.kv']).
        controller('mainCtrl', ['$scope', function (scope) {

            scope.dataObject = {
            };

            scope.propertiesCollection = [
                //{label: 'id', map: 'id', isEditable: true},
            ];

            scope.globalConfig = {
              legend: 'My Smart-KV Table'
            };

        }])
    ;