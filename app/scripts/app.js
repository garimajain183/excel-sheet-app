'use strict';

/**
 * @ngdoc overview
 * @name excelSheetAppApp
 * @description
 * # excelSheetAppApp
 *
 * Main module of the application.
 */
angular
  .module('excelSheetAppApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
