'use strict';

angular.module('codeivateApp')
  .factory('User', ['$resource', function ($resource) {
    return $resource('http://codeivate.com/users/:username.json?callback=JSON_CALLBACK', {}, {
      jsonpQuery: {
        method: 'JSONP',
        params: {
          username: 'username'
        }
      }
    });
  }]);
