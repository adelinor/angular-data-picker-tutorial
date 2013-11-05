var app = angular.module("data-picker-tutorial", []);

app.directive("datapicker", function() {
	return {
		restrict: "E",
		templateUrl: "datapicker/datapicker.html"
		//From directives talking to controllers video
/*
		,
		controller: function() {
			return function(scope, element, attrs) {
				scope.message = "I am working on it";
//				element.bind("mouseenter", function() {
//					alert("I am doing the job");
//				})
			}
		}
*/
		,
		//From angular-app/client/src/app/admin/users/admin-users-edit.js
		link: function(scope, el, attrs, ctrl) {
			scope.message = "I am working on it";
		}
	}
})
