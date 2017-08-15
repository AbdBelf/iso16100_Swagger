'use strict';

/**
 * @ngdoc function
 * @name iso16100PocApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the iso16100PocApp
 */
angular.module('iso16100PocApp')
  .controller('MainCtrl', function ($scope) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    
    $scope.showContent = function($fileContent){
        $scope.content = $fileContent;
    };
    
  });

angular.module('iso16100PocApp').directive('onReadFile', function ($parse) {
	return {
		restrict: 'A',
		scope: false,
		link: function(scope, element, attrs) {
            var fn = $parse(attrs.onReadFile);
            
			element.on('change', function(onChangeEvent) {
				var reader = new FileReader();
                
				reader.onload = function(onLoadEvent) {
					scope.$apply(function() {
						fn(scope, {$fileContent:onLoadEvent.target.result});
					});
				};

				reader.readAsText((onChangeEvent.srcElement || onChangeEvent.target).files[0]);
			});
		}
	};
});