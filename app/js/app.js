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
			var myFilter = function(orgs, text) {
				if (! text) {
					return orgs;
				}
				text = text.toLowerCase();
				if (! orgs) {
					return [];
				}
				var result = [];
				for(var i = 0; i < orgs.length; i++) {
					var o = orgs[i];
					var n = o.displayName;
					if (n && (n.toLowerCase().indexOf(text) != -1)) {
						result.push(o);
					}
				}
				return result;
			};
			scope.searchFn = function() {
				var url = '../messages/search-orgs.js';
   				$http.get(url).success(function(data) {
        			scope.searchResults = myFilter(data, scope.searchText);
    			});
				/* Errors have to be handled with
					.error(function(a,b,c,d) {
						...
					})
				*/
			};

			scope.selectFn = function(dn) {
				scope.selection = dn;
				setFromId(dn);
				scope.searchText = '';
				scope.searchResults = [];
			};

			scope.unselectFn = function() {
				scope.bindObj[scope.bindProp] = undefined;
				scope.selection = undefined;
			};

			var setFromId = function(val) {
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
				};

			// Update bindObj, updates selection
			scope.$watch('bindObj', function(value) {
				scope.selection = undefined;
				var sel = scope.bindObj[scope.bindProp];
				if (sel) {
					scope.selection = sel.dn;
				}
				scope.searchText = '';
				scope.searchResults = [];
			});

			var triggerSearchFn = function(e) {
				if (e.keyCode == 13) { 
					e.preventDefault();
					scope.searchFn();
				}
			};
			el.bind('keydown', triggerSearchFn);
		}
	}
});
