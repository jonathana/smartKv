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
