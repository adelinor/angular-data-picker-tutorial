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
	//Form is by default in create mode
    $scope.formMode = 'create';

    //Load labels
    $http.get('labels.js').success(function(data) {
        $scope.LABEL = data;
    });

	$scope.people = [];
	$scope.person = {};

	$scope.addPerson = function() {
		if (typeof $scope.person.id == 'undefined' ) {
			var pos = $scope.people.length;

			//Assign id
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

		//Reset form data via the bound object
		$scope.person = {};
		$scope.formMode = 'create';
	};

	$scope.editById = function(id) {
		$scope.formMode = 'edit';
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
    }
};
