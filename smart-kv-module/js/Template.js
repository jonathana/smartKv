/* global angular: false */
'use strict';
angular.module('smartKv.templates', ['partials/smartKv_outer.html']);

angular.module('partials/smartKv_outer.html', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('partials/smartKv_outer.html',
    '<div class="smart-kv {{ kvClass }}">\n' +
    '    <legend class="smart-kv-legend" ng-hide="kvTitle === \"\"">{{ kvTitle }}</legend>\n' +
    '    <div ng-repeat="property in propertiesCollection"\n' +
    '        class="smart-kv-row {{kvRowClass}} {{property.kvRowClass}} {{ bsRowClass }}">\n' +
    '      <div class="smart-kv-label {{ bsLabelWidthClass }}"><div class="{{ kvLabelClass }}">{{ property.label }}</div></div>\n' +
    '      <div class="smart-kv-value {{ bsValueWidthClass }}"><div class="smart-kv-value-holder {{ kvValueClass }}"></div></div>\n' +
    '    </div>\n' +
    '</div>\n' +
    '');
}]);
