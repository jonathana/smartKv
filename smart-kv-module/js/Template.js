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
