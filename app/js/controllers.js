/*
 * Taken from
 * http://docs.angularjs.org/tutorial/step_05
 */
function OrgsListCtrl($scope, $http) {
	$http.get('../messages/search-orgs.js').success(function(data) {
		$scope.searchResults = data;
	});
}

//OrgsListCtrl.$inject = ['$scope', '$http'];

function PeopleCtrl($scope, $http) {
	$scope.people = [];

	$scope.addPerson = function() {
		var pos = $scope.people.length;
		$scope.people.push(
			{
				id: pos,
				name:$scope.personNameNG
			} );
		$scope.personNameNG = '';
	};

	$scope.editById = function(id) {
		alert('You want to edit person with ID=' + id);
	}
};
