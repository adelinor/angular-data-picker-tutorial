var app = angular.module("data-picker-tutorial", []);

app.factory('orgSearchProvider', ["$http",function($http) {
	return new OrgSearchProvider($http);
}]);

app.directive("tutorialDatapicker", function($http,orgSearchProvider) {
	return {
		restrict: "E",
		scope: {
			parentId: '@',
			bindObj: '=',
			bindProp: '@',
			searchSizeLimit: '@',
		},
		templateUrl: "datapicker/tutorial-datapicker.html",

		//From angular-app/client/src/app/admin/users/admin-users-edit.js
		link: function(scope, el, attrs, ctrl) {
			scope.errorMessages = {
				'NOTHING_FOUND': 'No results found for the provided criteria',
				'SEARCH_LIMIT_EXCEEDED': 'Number of results exceeds limit,' +
				                         ' please refine criteria'
			};
			scope.cssClasses = {
				'NOTHING_FOUND': 'has-error',
				'SEARCH_LIMIT_EXCEEDED': 'has-warning'
			};
			scope.searchFn = function() {
				orgSearchProvider.search(scope.searchText, function(data) {
        			scope.searchResults = data;
					
					var l = scope.searchResults.length;
					if (l == 0) {
						scope.state = 'NOTHING_FOUND';

					} else if (scope.searchSizeLimit && l > scope.searchSizeLimit) {
						scope.state = 'SEARCH_LIMIT_EXCEEDED';

					} else {
						scope.state = '';
					}
    			});
			};

			scope.clearStateFn = function() {
				scope.searchText = '';
				scope.searchResults = [];
				scope.state = '';
			};

			scope.selectFn = function(dn) {
				scope.selection = dn;
				setFromId(dn);
				scope.clearStateFn();
			};

			scope.unselectFn = function() {
				scope.bindObj[scope.bindProp] = undefined;
				scope.selection = undefined;
			};

			scope.cssBtn = function(formGroupClass) {
				if (formGroupClass === 'has-error') {
					return 'btn-danger';

				} else if (formGroupClass === 'has-warning') {
					return 'btn-warning';

				} else {
					return 'btn-default';
				}
			};

			scope.cssPanel = function(formGroupClass) {
				if (formGroupClass === 'has-error') {
					return 'panel-danger';

				} else if (formGroupClass === 'has-warning') {
					return 'panel-warning';

				} else {
					return 'panel-info';
				}
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
				scope.clearStateFn();
			});

			var triggerSearchFn = function(e) {
				if (e.keyCode == 13) { 
					e.preventDefault();
					scope.searchFn();
				}
			};
			el.bind('keydown', triggerSearchFn);

			// Find parent with form-group class
			var findParentWithClass = function(elt, className, maxDepth) {
				for (var i = 0; elt && (i < maxDepth); i++) {
					if (elt.hasClass(className)) {
						return elt;
					}
					elt = elt.parent();
				}
				return undefined;
			};
			scope.formGroupEl = findParentWithClass(el,'form-group', 5);

			scope.$watch('state', function(value) {
				if (scope.formGroupCssClass) {
					scope.formGroupEl.removeClass(scope.formGroupCssClass);
				}
				scope.formGroupCssClass = scope.cssClasses[value];
				if (scope.formGroupCssClass) {
					scope.formGroupEl.addClass(scope.formGroupCssClass);
				}
			});
		}
	}
});

app.directive("tutorialDatapicker", function($http) {
	return {
		restrict: "E",
		scope: {
			parentId: '@',
			bindObj: '=',
			bindProp: '@',
			searchSizeLimit: '@',
		},
		templateUrl: "datapicker/tutorial-datapicker.html",

		//From angular-app/client/src/app/admin/users/admin-users-edit.js
		link: function(scope, el, attrs, ctrl) {
			scope.errorMessages = {
				'NOTHING_FOUND': 'No results found for the provided criteria',
				'SEARCH_LIMIT_EXCEEDED': 'Number of results exceeds limit,' +
				                         ' please refine criteria'
			};
			scope.cssClasses = {
				'NOTHING_FOUND': 'has-error',
				'SEARCH_LIMIT_EXCEEDED': 'has-warning'
			};
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
					
					var l = scope.searchResults.length;
					if (l == 0) {
						scope.state = 'NOTHING_FOUND';

					} else if (scope.searchSizeLimit && l > scope.searchSizeLimit) {
						scope.state = 'SEARCH_LIMIT_EXCEEDED';

					} else {
						scope.state = '';
					}
    			});
				/* Errors have to be handled with
					.error(function(a,b,c,d) {
						...
					})
				*/
			};

			scope.clearStateFn = function() {
				scope.searchText = '';
				scope.searchResults = [];
				scope.state = '';
			};

			scope.selectFn = function(dn) {
				scope.selection = dn;
				setFromId(dn);
				scope.clearStateFn();
			};

			scope.unselectFn = function() {
				scope.bindObj[scope.bindProp] = undefined;
				scope.selection = undefined;
			};

			scope.cssBtn = function(formGroupClass) {
				if (formGroupClass === 'has-error') {
					return 'btn-danger';

				} else if (formGroupClass === 'has-warning') {
					return 'btn-warning';

				} else {
					return 'btn-default';
				}
			};

			scope.cssPanel = function(formGroupClass) {
				if (formGroupClass === 'has-error') {
					return 'panel-danger';

				} else if (formGroupClass === 'has-warning') {
					return 'panel-warning';

				} else {
					return 'panel-info';
				}
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
				scope.clearStateFn();
			});

			var triggerSearchFn = function(e) {
				if (e.keyCode == 13) { 
					e.preventDefault();
					scope.searchFn();
				}
			};
			el.bind('keydown', triggerSearchFn);

			// Find parent with form-group class
			var findParentWithClass = function(elt, className, maxDepth) {
				for (var i = 0; elt && (i < maxDepth); i++) {
					if (elt.hasClass(className)) {
						return elt;
					}
					elt = elt.parent();
				}
				return undefined;
			};
			scope.formGroupEl = findParentWithClass(el,'form-group', 5);

			scope.$watch('state', function(value) {
				if (scope.formGroupCssClass) {
					scope.formGroupEl.removeClass(scope.formGroupCssClass);
				}
				scope.formGroupCssClass = scope.cssClasses[value];
				if (scope.formGroupCssClass) {
					scope.formGroupEl.addClass(scope.formGroupCssClass);
				}
			});
		}
	}
});
