/* global angular: false */

(function (angular) {
  'use strict';
  angular.module('smartKv.directives', ['smartKv.templates'])
    .directive('smartKv', ['DefaultKvConfiguration', function (defaultConfig) {
      return {
        restrict: 'EA',
        scope: {
          propertiesCollection: '=properties',
          dataObject: '=dataObject',
          config: '='
        },
        replace: 'true',
        templateUrl: 'partials/smartKv_outer.html',
        controller: 'TableCtrl',
        link: function (scope, element, attr, ctrl) {

          scope.$watch('config', function (config) {
            var newConfig = angular.extend({}, defaultConfig, config);

            ctrl.setGlobalConfig(newConfig);
          }, true);
        }
      };
    }]);
})(angular);

(function (angular) {
  'use strict';
  angular.module('smartKv.kv', ['smartKv.directives', 'smartKv.templates'])
  .constant('DefaultKvConfiguration', {
    defaultStyleName: 'smart-kv',
    labelWidth: 4,
    valueWidth: 4,
    legend: ''
  })
  .controller('TableCtrl', ['$scope', 'DefaultKvConfiguration', function (scope, defaultConfig) {

    scope.columns = [];
    scope.dataCollection = scope.dataCollection || [];

    /**
  * set the config (config parameters will be available through scope
  * @param config
  */
    this.setGlobalConfig = function (config) {
      angular.extend(scope, defaultConfig, config);
    };

  }]);
})(angular);
