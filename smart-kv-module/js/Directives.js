/* Directives */
/* global angular: false */

(function (angular) {
  'use strict';
  angular.module('smartKv.directives', ['smartKv.templates', 'smartKv.filters'])
      .directive('smartKv', ['DefaultKvConfiguration', function (defaultConfig) {
        return {
          restrict: 'EA',
          scope: {
            propertiesCollection: '=properties',
            sourceObject: '=source',
            config: '=',
            kvTitle: '=',
            kvClass: '='
          },
          replace: 'false',
          templateUrl: 'partials/smartKv_outer.html',
          controller: 'KvCntl',
          link: function (scope, element, attr, ctrl) {

            var newConfig = angular.extend({}, defaultConfig, scope.config);
            ctrl.setGlobalConfig(newConfig);
            ctrl.setSourceObject(scope.sourceObject);

            scope.$watch('config', function (config) {
              var newConfig = angular.extend({}, defaultConfig, config);

              ctrl.setGlobalConfig(newConfig);
            }, true);

            scope.$watch('dataObject.keys.length', function () {
              ctrl.setSourceObject(scope.sourceObject);
            }, true);

            scope.$watch('propertiesCollection.length', function(){
              ctrl.setObjectProperties(scope.propertiesCollection);
            }, true);

          }
        };
      }])
    //a customisable div (see templateUrl)
    //TODO check with the ng-include strategy
      .directive('smartKvValueHolder', ['$filter', '$http', '$templateCache', '$compile', function (filter, http, templateCache, compile) {
        return {
          restrict: 'C',
          require: '^smartKv',
          scope: true,
          replace: true,
          link: function (scope, element, attr, ctrl) {
            var
                valueProperty = scope.property,
                sourceObject = ctrl.getSourceObject(),
                format = filter('format'),
                childScope;

            //can be useful for child directives
            scope.formattedValue = sourceObject[valueProperty.map] ?
                format(sourceObject[valueProperty.map], valueProperty.formatFunction, valueProperty.formatParameter) :
                scope.config.defaultCellValue;

            function defaultContent() {
              element.text(scope.formattedValue);
            }

            scope.$watch('valueProperty.valueTemplateUrl', function (value) {

              if (value) {
                //we have to load the template (and cache it) : a kind of ngInclude
                http.get(value, {cache: templateCache}).success(function (response) {

                  //create a scope
                  childScope = scope.$new();
                  //compile the element with its new content and new scope
                  element.html(response);
                  compile(element.contents())(childScope);
                }).error(defaultContent);

              } else {
                defaultContent();
              }
            });
          }
        };
      }]);
})(angular);
