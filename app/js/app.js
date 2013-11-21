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
			var searchFn = function(scope) {
				var url = '../messages/search-orgs.js';
   				$http.get(url).success(function(data) {
        			scope.searchResults = data;
    			});
				/* Errors have to be handled with
					.error(function(a,b,c,d) {
						...
					})
				*/
			};
			searchFn(scope);

			// Update selection, updates object's property
			scope.$watch('selection', function(val) {
					var m;
					for (var i = 0; (! m) &&
							scope.searchResults &&
							(i < scope.searchResults.length); i++)
					{
						var c = scope.searchResults[i];
						if (val === c.dn) {
							m = c;
						}
					}
					scope.bindObj[scope.bindProp] = m;
				});

			// Update bindObj, updates selection
			scope.$watch('bindObj', function(value) {
				scope.selection = undefined;
				var sel = scope.bindObj[scope.bindProp];
				if (sel) {
					scope.selection = sel.dn;
				}
			});

			var searchFn = function(e) {
				var isReturnKey = (e.keyCode == 13);
				// && (! e.altKey) && (! e.shiftKey) && (! e.ctrlKey);
				if (isReturnKey) {
					alert('is return key? ' + isReturnKey);
					return false;
				}
				return true;
			};
			//el.bind('keypress', searchFn);
			el.bind('keydown', searchFn);

			var submitFn = function(e) {
				alert('submit event ' + e);
				return false;
			};
			//el.bind('keypress', submitFn);
		}
	}
});
