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
		/* This needs to somehow refresh the model for the Edit form
		 * which should then change the title, label, prepopulate the form fields
		 * and setup the label on the button
		 * the callback would need to behave in a different way: the entire object
		 * needs to be passed, if no ID, create it. Otherwise update existing.
		 */
	}
}
