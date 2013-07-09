/* global angular: false */

(function (angular) {
  'use strict';
  angular.module('smartKv.kv', ['smartKv.directives', 'smartKv.templates', 'smartKv.filters'])
  .constant('DefaultKvConfiguration', {
    labelWidth: 4,
    totalWidth: 10,
    legend: '',
    defaultCellValue: '\u00A0'
  })
  .controller('TableCtrl', ['$scope', '$log', 'DefaultKvConfiguration', function (scope, log, defaultConfig) {

    scope.objectProperties = [];
    scope.sourceObject = scope.sourceObject || {};
    angular.extend(scope, defaultConfig);

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

    this.setObjectProperties = function setObjectProperties(propsCollection) {
      scope.objectProperties = propsCollection;
    };
  }]);
})(angular);
