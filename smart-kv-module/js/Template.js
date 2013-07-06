/* global angular: false */
'use strict';
angular.module('smartKv.templates', ['partials/smartKv_outer.html']);

angular.module('partials/smartKv_outer.html', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('partials/smartKv_outer.html',
    '<div class="smart-kv container">\n' +
    '  <h2 ng-hide="legend === \"\"">{{ legend }}</h2>\n' +
    '  <div ng-repeat="property in propertiesCollection" ng-class="{useFluid ? \'row-fluid\' : \'fluid\'}"\n' +
    '      class="smart-kv-property-row" style="border: 2px solid #00f; padding: 2px">\n' +
    '    <div class="span4" style="border: 2px solid #0ff; padding: 2px"><div class="pull-right">Label</div></div>\n' +
    '    <div class="span8" style="border:2px solid #f0f; padding: 2px"><div class="pull-left">Value</div></div>\n' +
    '  </div>\n' +
    '</div>\n' +
    '');
}]);
