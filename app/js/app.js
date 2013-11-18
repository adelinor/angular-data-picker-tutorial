var app = angular.module("data-picker-tutorial", []);

app.directive("tutorialDatapicker", function($http) {
	return {
		restrict: "E",
		scope: {
			id: '@',
			bindObj: '=',
			bindProp: '@'
		},
		templateUrl: "datapicker/tutorial-datapicker.html",

		//From angular-app/client/src/app/admin/users/admin-users-edit.js
		link: function(scope, el, attrs, ctrl) {
			var url = '../messages/search-orgs.js';
    		$http.get(url).success(function(data) {
        		scope.searchResults = data;
    		});
			/* Errors have to be handled with
					.error(function(a,b,c,d) {
						...
					})
			*/

			// Update selection, updates object's property
			scope.$watch('selection', function(val) {
					scope.bindObj[scope.bindProp] = val;
				});

			// Update bindObj, updates selection
			scope.$watch('bindObj', function(value) {
				scope.selection = scope.bindObj[scope.bindProp];
			});
		}
	}
});
