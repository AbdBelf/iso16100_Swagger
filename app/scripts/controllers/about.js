'use strict';

/**
 * @ngdoc function
 * @name iso16100PocApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the iso16100PocApp
 */
angular.module('iso16100PocApp')
  .controller('AboutCtrl', function () {
  
	  $("#mainContainer").removeClass( "container" );
	  this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    
  });
