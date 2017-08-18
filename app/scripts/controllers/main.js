'use strict';

/**
 * @ngdoc function
 * @name iso16100PocApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the iso16100PocApp
 */
angular.module('iso16100PocApp')
  .controller('MainCtrl', function ($scope,$http) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    
    $scope.showContent = function($fileContent){
        $scope.content = $fileContent;
    };
    

    $scope.uploadFile = function(){
        var file = $scope.myFile;        
        var uploadUrl = "http://localhost:8080/iso16100/swagger";
        var fd = new FormData();
        fd.append('file', file);
        
        $http({
        	  method: 'POST',
        	  url: uploadUrl,
        	  data : fd,
        	  transformRequest: angular.identity,
              headers: {'Content-Type': undefined},
              transformResponse: [function (data) {
                  return data;
              }]
        	}).then(function successCallback(response) {
        		$scope.swaggerContent = response.data;
        		
        	  }, function errorCallback(response) {
        		  
        		  $scope.swaggerContent = response;
        	  });
     	}; 
     	

     	$scope.createYamlFile = function(){
     		
     		  var file = $scope.myFile;        
     	      var uploadUrl = "http://localhost:8080/iso16100/swaggerFile";
     	      var fd = new FormData();
     	      fd.append('file', file);
     	      
     	      $http({
     	      	  method: 'POST',
     	      	  url: uploadUrl,
     	      	  data : fd,
     	      	  transformRequest: angular.identity,
     	            headers: {'Content-Type': undefined},
     	            transformResponse: [function (data) {
     	                return data;
     	            }]
     	      	}).then(function successCallback(response) {
     	      		
	     	      	var blob = new Blob([response.data], {type: "txt/plain"});
	     	        var objectUrl = URL.createObjectURL(blob);
	     	        var a = document.createElement("a");
	     	       	a.style = "display: none";
	     	        a.href = objectUrl;
	     	        a.download = "specification.yaml";
	     	        a.click();
	     	        window.URL.revokeObjectURL(objectUrl);
     	      		
     	      	  }, function errorCallback(response) {
     	     
     	      	  });
     	}
     	
     	
  	});


angular.module('iso16100PocApp').directive('fileModel', ['$parse', function ($parse) {
    return {
       restrict: 'A',
       link: function(scope, element, attrs) {
          var model = $parse(attrs.fileModel);
          var modelSetter = model.assign;
          
          element.bind('change', function(){
             scope.$apply(function(){
                modelSetter(scope, element[0].files[0]);
             });
          });
       }
    };
 }]);

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
