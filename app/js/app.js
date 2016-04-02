'use strict';

// Declare app level module which depends on views, and components
var myApp = angular.module('myApp', [
  'ngMaterial',
  'ui.router'
]).config(function($stateProvider, $urlRouterProvider) {
  //
  // // For any unmatched url, redirect to /state1
  // $urlRouterProvider.otherwise("/home");
  // //
  // Now set up the states
  $stateProvider
      .state('home', {
        url: "/",
        templateUrl: "partials/home.html",
        controller: "HomeCtrl"
      });
});