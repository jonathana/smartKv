/* global angular: false */

(function (angular) {
  'use strict';
  angular.module('smartKv.directives', ['smartKv.templates'])
    .directive('smartKv', function () {
      return {
        restrict: 'EA',
        scope: {
          propertiesCollection: '=properties',
          dataObject: '=dataObject',
          config: '='
        },
        replace: 'true',
        templateUrl: 'partials/smartKv_outer.html'
      };
    });
})(angular);
(function (angular) {
  'use strict';
  angular.module('smartKv.kv', ['smartKv.directives', 'smartKv.templates'])
  .constant('DefaultKvConfiguration', {
    defaultStyleName: 'smart-kv'
    //just to remind available option
  });
})(angular);
