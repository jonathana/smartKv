'use strict';
// Declare app level module which depends on filters, and services
var app = angular.module('myApp', ['smartKv.kv']).
    controller('mainCtrl', ['$scope', function (scope) {

      scope.dataObject = {
        foo: 'bar',
        bar: 12345,
        foobar: new Date(2013, 7, 6, 14, 13)
      };

      scope.propertiesCollection = [
        {label: 'Random String', map: 'foo'},
        {label: 'An integer', map: 'bar'},
        {label: 'Not here', map: 'notPresent'},
        {label: 'A specific date', map: 'foobar'}
      ];

      scope.globalConfig = {
        legend: 'My Smart-KV Table',
        defaultCellValue: 'N/A'
      };

    }])
  ;