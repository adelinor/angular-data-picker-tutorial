var app = angular.module("data-picker-tutorial", []);

app.factory('orgSearchProvider', ["$http",function($http) {
    return new OrgSearchProvider($http);
}]);

app.directive("tutorialDatapicker", function($http,orgSearchProvider) {
	return {
		restrict: "E",
		scope: {
			id: '@',
			bindObj: '=',
			bindProp: '@'
		},
		templateUrl: "datapicker/tutorial-datapicker.html",
		link: function(scope, el, attrs, ctrl) {
			scope.searchFn = function() {
				orgSearchProvider.search(scope.searchText, function(data) {
        			scope.searchResults = data;
    			});
			};

			var triggerSearchFn = function(e) {
	    		if (e.keyCode == 13) { 
   		     		e.preventDefault();
       		 		scope.searchFn();
    			}
			};
			el.bind('keydown', triggerSearchFn);

			scope.selectFn = function(dn) {
				scope.selection = dn;
			};

			// Update selection, updates object's property
			scope.$watch('selection', function(val) {
					var m;
					for (var i = 0; (! m) &&
							scope.searchResults &&
							(i < scope.searchResults.length); i++) {
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

		}
	}
});
