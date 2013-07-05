/* global angular: false */
'use strict';
angular.module('smartKv.templates', ['partials/smartKv_outer.html']);

angular.module('partials/smartKv_outer.html', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('partials/smartKv_outer.html',
    '<div class="smart-kv container"><h2>bar</h2></div>\n' +
    '');
}]);

/* global angular: false */

(function (angular) {
  'use strict';
  angular.module('smartKv.directives', ['smartKv.templates'])
    .directive('smartKv', function () {
      return {
        restrict: 'EA',
        scope: {
          propertiesCollection: '=properties',
          dataObject: '=dataObject',
          config: '='
        },
        replace: 'true',
        templateUrl: 'partials/smartKv_outer.html'
      };
    });
})(angular);
(function (angular) {
  'use strict';
  angular.module('smartKv.kv', ['smartKv.directives', 'smartKv.templates'])
  .constant('DefaultKvConfiguration', {
    defaultStyleName: 'smart-kv'
    //just to remind available option
  });
})(angular);
