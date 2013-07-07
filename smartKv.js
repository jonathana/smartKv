/* global angular: false */
'use strict';
angular.module('smartKv.templates', ['partials/smartKv_outer.html']);

angular.module('partials/smartKv_outer.html', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('partials/smartKv_outer.html',
    '<div class="smart-kv container">\n' +
    '    <h2 ng-hide="legend === \"\"">{{ legend }}</h2>\n' +
    '    <div ng-repeat="property in propertiesCollection" ng-class="bsRowClass"\n' +
    '        class="smart-kv-row">\n' +
    '      <div class="smart-kv-label" ng-class="bsLabelWidthClass"><div class="pull-right">{{ property.label }}</div></div>\n' +
    '      <div class="smart-kv-value" ng-class="bsValueWidthClass"><div class="pull-left">{{ sourceObject[property.map] || defaultCellValue }}</div></div>\n' +
    '    </div>\n' +
    '</div>\n' +
    '');
}]);

/* global angular: false */

(function (angular) {
  'use strict';
  angular.module('smartKv.directives', ['smartKv.templates'])
    .directive('smartKv', ['DefaultKvConfiguration', function (defaultConfig) {
      return {
        restrict: 'EA',
        scope: {
          propertiesCollection: '=properties',
          source: '=',
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

          scope.$watch('dataObject', function () {
            ctrl.setSourceObject(scope.source);
          }, true);
        }
      };
    }]);
})(angular);

(function (angular) {
  'use strict';
  angular.module('smartKv.kv', ['smartKv.directives', 'smartKv.templates'])
  .constant('DefaultKvConfiguration', {
    labelWidth: 4,
    totalWidth: 10,
    legend: '',
    defaultCellValue: '\u00A0'
  })
  .controller('TableCtrl', ['$scope', 'DefaultKvConfiguration', function (scope, defaultConfig) {

    scope.objectProperties = [];
    scope.sourceObject = scope.sourceObject || {};

    /**
  * set the config (config parameters will be available through scope
  * @param config
  */
    this.setGlobalConfig = function (config) {
      angular.extend(scope, defaultConfig, config);
      scope.bsRowClass = scope.rowFluid ? 'row-fluid' : 'row';
      scope.bsRowWidthClass = 'span' + scope.totalWidth.toString();
      scope.bsLabelWidthClass = 'span' + scope.labelWidth.toString();
      scope.bsValueWidthClass = 'span' + (scope.totalWidth - scope.labelWidth).toString();
    };

    this.setSourceObject = function setSourceObject (srcObj) {
      scope.sourceObject = srcObj;
    };
  }]);
})(angular);
