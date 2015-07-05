var givingPortfolio = angular.module('givingPortfolio', []);

// https://gist.github.com/eliotsykes/5394631 .... trying to get OnBlur... as a trigger for saving...
// givingPortfolio.directive('ngFocus', ['$parse', function($parse) {
//   return function(scope, element, attr) {
//     var fn = $parse(attr['ngFocus']);
//     element.bind('focus', function(event) {
//       scope.$apply(function() {
//         fn(scope, {$event:event});
//       });
//     });
//   }
// }]);
 
// givingPortfolio.directive('ngBlur', ['$parse', function($parse) {
//   return function(scope, element, attr) {
//     var fn = $parse(attr['ngBlur']);
//     element.bind('blur', function(event) {
//       scope.$apply(function() {
//         fn(scope, {$event:event});
//       });
//     });
//   }
// }]);



function mainController($scope, $http){

	$scope.formData = {};

	$http.get('/api/organizations')
		.success(function(data){
			$scope.organizations = data;
		})
		.error(function(data){
			console.log("Error: "+data); alert("Error: "+data);
		});

	$scope.createOrganization = function(){

		$http.post('/api/organizations', $scope.formData)
			.success(function(data){
				$scope.formData = {};
				$scope.organizations = data;
			})
			.error(function(data){
				console.log("Error: "+data); alert("Error: "+data);
			});
	}

	$scope.deleteOrganization = function(id){

		$http.delete('/api/organizations/'+id)
			.success(function(data){
				$scope.organizations = data;
			})
			.error(function(data){
				console.log("Error: "+data); alert("Error: "+data);
			});
	}

	$scope.incrementOrgPortion = function(org, delta){

		org.portion += delta;

		// ... validation and update logic
		// 
		
		$scope.saveOrg(org);

	}

	$scope.saveOrg = function(org){ // i'm wanting to make this a method of org itself... right? if so, how?

		// alert('saving org');
		$http.put('/api/organizations/'+org._id, org)
			.success(function(data){
				$scope.organizations = data; // wait... why am I not having to manually $apply();?
			})
			.error(function(data){
				console.log("Error: "+data); alert("Error: "+data);
			});

	}


}