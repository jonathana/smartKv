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
            config: '='
          },
          replace: 'false',
          templateUrl: 'partials/smartKv_outer.html',
          controller: 'TableCtrl',
          link: function (scope, element, attr, ctrl) {

            var newConfig = angular.extend({}, defaultConfig, scope.config);
            ctrl.setGlobalConfig(newConfig);

            scope.$watch('config', function (config) {
              var newConfig = angular.extend({}, defaultConfig, config);

              ctrl.setGlobalConfig(newConfig);
            }, true);

            scope.$watch('dataObject.keys.length', function () {
              ctrl.setSourceObject(scope.source);
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
          link: function (scope, element) {
            var
                valueProperty = scope.property,
                sourceObject = scope.sourceObject,
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

/* Filters */
/* global angular: false */

(function (angular) {
  'use strict';
  angular.module('smartKv.filters', []).
      constant('DefaultFilters', ['currency', 'date', 'json', 'lowercase', 'number', 'uppercase']).
      filter('format', ['$filter', 'DefaultFilters', function (filter, defaultfilters) {
        return function (value, formatFunction, filterParameter) {

          var returnFunction;

          if (formatFunction && angular.isFunction(formatFunction)) {
            returnFunction = formatFunction;
          } else {
            returnFunction = defaultfilters.indexOf(formatFunction) !== -1 ? filter(formatFunction) : function (value) {
              return value;
            };
          }
          return returnFunction(value, filterParameter);
        };
      }]);
})(angular);



/* global angular: false */
'use strict';
angular.module('smartKv.templates', ['partials/smartKv_outer.html']);

angular.module('partials/smartKv_outer.html', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('partials/smartKv_outer.html',
    '<div class="smart-kv container">\n' +
    '    <legend class="smart-kv-legend" ng-hide="legend === \"\"">{{ legend }}</legend>\n' +
    '    <div ng-repeat="property in propertiesCollection" ng-class="bsRowClass"\n' +
    '        class="smart-kv-row {{ kvRowClass }}">\n' +
    '      <div class="smart-kv-label {{ bsLabelWidthClass }}"><div class="{{ kvLabelClass }}">{{ property.label }}</div></div>\n' +
    '      <div class="smart-kv-value {{ bsValueWidthClass }}"><div class="smart-kv-value-holder {{ kvValueClass }}"></div></div>\n' +
    '    </div>\n' +
    '</div>\n' +
    '');
}]);

/* KeyValue module */
/* global angular: false */

(function (global, angular) {
  'use strict';
  var smartKvKeyValueModule = angular.module('smartKv.keyValue', []).constant('DefaultKeyValueConfiguration', {
    type: 'text',


    //it is useless to have that empty strings, but it reminds what is available
    map: '',
    label: '',
    formatFunction: '',
    formatParameter: '',
    valueTemplateUrl: '',
    labelClass: '',
    valueClass: ''
  });

  function KeyValueProvider(DefaultKeyValueConfiguration) {

    function KeyValue(config) {
      if (!(this instanceof KeyValue)) {
        return new KeyValue(config);
      }
      angular.extend(this, config);
    }

    this.setDefaultOption = function (option) {
      angular.extend(KeyValue.prototype, option);
    };

    this.setDefaultOption(DefaultKeyValueConfiguration);

    this.$get = function () {
      return KeyValue;
    };
  }

  KeyValueProvider.$inject = ['DefaultKeyValueConfiguration'];
  smartKvKeyValueModule.provider('KeyValue', KeyValueProvider);

  //make it global so it can be tested
  global.KeyValueProvider = KeyValueProvider;
})(window, angular);

/* global angular: false */

(function (angular) {
  'use strict';
  angular.module('smartKv.kv', ['smartKv.directives', 'smartKv.templates', 'smartKv.filters'])
  .constant('DefaultKvConfiguration', {
    labelWidth: 4,
    totalWidth: 10,
    legend: '',
    defaultCellValue: '\u00A0',
    defaultKvLabelClass: 'pull-right',
    defaultKvValueClass: 'pull-left',
    defaultKvRowClass: ''
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
  }]);
})(angular);
