/* global angular: false */
'use strict';
angular.module('smartKv.templates', ['partials/smartKv_outer.html']);

angular.module('partials/smartKv_outer.html', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('partials/smartKv_outer.html',
    '<div class="smart-kv container"><h2>bar</h2></div>\n' +
    '');
}]);
