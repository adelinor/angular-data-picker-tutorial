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

	var resetForm = function() {
		$scope.person = {};
		$scope.formTitle = 'Add new';
		$scope.formButtonLabel = 'Add';
	};
	resetForm();

	$scope.addPerson = function() {
		if (typeof $scope.person.id == 'undefined' ) {
			var pos = $scope.people.length;
			$scope.person.id = pos;
			$scope.people.push( $scope.person );
		} else {
			//Replace object in list
			var id = $scope.person.id;
			var pList = $scope.people;
			var i=0, len=pList.length, notReplaced = true;

			for (; notReplaced && i < len; i++) {
				if (pList[i].id === id) {
					pList[i] = $scope.person;
					notReplaced = false;
				}
			}
		}
		resetForm();
	};

	$scope.editById = function(id) {
		var pList = $scope.people;
		var i=0, len=pList.length;
		var p = null, item = null;

		for (; p == null && i < len; i++) {
			item = pList[i];
			if (item.id === id) {
				//p = item;
				//We edit a copy
				p = angular.copy(item);
			}
		}
		$scope.person = p;
		$scope.formTitle = 'Edit';
		$scope.formButtonLabel = 'Apply';
	};
}
