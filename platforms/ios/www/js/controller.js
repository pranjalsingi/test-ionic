var app = angular.module('wander');

app.controller('GeoController', ['$scope','$http', function($scope, $http){

	$scope.getPosition = function() {

	   var options = {};/*{
	      maximumAge: 3600000,
	      timeout: 3000,
	      enableHighAccuracy: false
	   }*/

	   var watchID = navigator.geolocation.getCurrentPosition(onSuccess, onError, options);

	   function onSuccess(position) {

	   		$http({
			  method: 'POST',
			  url: 'http://23.96.125.188:5000/updateLoc',
			  data: { "groupCode" : "K7UN", "dispName" : "sdfs" ,"loc" : [position.coords.latitude, position.coords.longitude] }
			}).then(function successCallback(response) {
			    // this callback will be called asynchronously
			    // when the response is available
			    console.log(response);
			  }, function errorCallback(response) {
			    // called asynchronously if an error occurs
			    // or server returns response with an error status.
			    console.log("in error");
			    console.log(response);
			  });

	      	console.log('Latitude: '          + position.coords.latitude          + '\n' +
	         'Longitude: '         + position.coords.longitude         + '\n');
	   };

	   function onError(error) {
	      alert('code: '    + error.code    + '\n' +'message: ' + error.message + '\n');
	   }
	}
}]);

app.controller('GroupJoinedController', ['$scope', function($scope){


	
}]);

app.controller('CreateGroupController', ['$scope','$http','$state', function($scope, $http, $state){

	$scope.group = {
		groupName: "",
		dispName: "",
		triggerDist: ""
	}

	$scope.create = function(){
		$http({
		  method: 'POST',
		  url: 'http://23.96.125.188:5000/createGroup',
		  data: {"groupName" : $scope.group.groupName, "dispName" : $scope.group.dispName, "triggerDist" : $scope.group.triggerDist }
		}).then(function successCallback(response) {
		    // this callback will be called asynchronously
		    // when the response is available
		    console.log("in success");
		    console.log(response.data.groupCode);
		    $scope.group.groupCode = response.data.groupCode;
		    $state.go('created', { obj : $scope.group });
		  }, function errorCallback(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		    console.log("in error");
		    console.log(response);
		  });
	}

	
}]);

app.controller('EndGroupController', ['$scope','$http','$state', function($scope, $http, $state){

	$scope.group = $state.params.obj;
	console.log($scope.group);

	$scope.test = function(){
		alert("Hey");
	}

	$scope.destroy = function(){
		$http({
		  method: 'GET',
		  url: 'http://23.96.125.188:5000/groupEnd/'+$scope.group.groupCode
		}).then(function successCallback(response) {
		    // this callback will be called asynchronously
		    // when the response is available
		    console.log("in success");
		    $state.go('newgroup');
		  }, function errorCallback(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		    console.log("in error");
		    console.log(response);
		  });
	}
	
}]);