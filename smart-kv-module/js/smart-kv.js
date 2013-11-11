/* global angular: false */

(function (angular) {
  'use strict';
  angular.module('smartKv.kv', ['smartKv.directives', 'smartKv.templates', 'smartKv.filters'])
  .constant('DefaultKvConfiguration', {
    labelWidth: 4,
    totalWidth: 10,
    defaultCellValue: '\u00A0',
    defaultKvLabelClass: 'pull-right',
    defaultKvValueClass: 'pull-left',
    defaultKvRowClass: ''
  })
  .controller('KvCntl', ['$scope', 'DefaultKvConfiguration', function (scope, defaultConfig) {

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
      scope.bsLabelWidthClass = 'span' + scope.labelWidth.toString();
      scope.bsValueWidthClass = 'span' + (scope.totalWidth - scope.labelWidth).toString();
      scope.kvRowClass = scope.kvRowClass || scope.defaultKvRowClass;
      scope.kvValueClass = scope.kvValueClass || scope.defaultKvValueClass;
      scope.kvLabelClass = scope.kvLabelClass || scope.defaultKvLabelClass;
    };

    this.setSourceObject = function setSourceObject (srcObj) {
      scope.sourceObject = srcObj;
    };

    this.setObjectProperties = function setObjectProperties(propsCollection) {
      scope.objectProperties = propsCollection;
    };

    this.getSourceObject = function getSourceObject () {
      return scope.sourceObject;
    };
  }]);
})(angular);
