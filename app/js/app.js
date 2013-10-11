var app = angular.module("data-picker-tutorial", []);

app.directive("datapicker", function() {
	return {
		restrict: "E",
		templateUrl: "datapicker/view.html"
	}
})
