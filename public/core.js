var givingPortfolio = angular.module('givingPortfolio', []);

function mainController($scope, $http){

	$scope.formData = {};

	$http.get('/api/organizations')
		.success(function(data){
			$scope.organizations = data;
			console.log(data);
		})
		.error(function(data){
			console.log("Error: "+data);
		});

	$scope.createOrganization = function(){

		$http.post('/api/organizations', $scope.formData)
			.success(function(data){
				$scope.formData = {};
				$scope.organizations = data;
				console.log(data);
			})
			.error(function(data){
				console.log("Error: "+data);
			});
	}

	$scope.deleteOrganization = function(id){

		$http.delete('/api/organizations/'+id)
			.success(function(data){
				$scope.organizations = data;
				console.log(data);
			})
			.error(function(data){
				console.log("Error: "+data);
			});
	}


}