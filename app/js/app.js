var app = angular.module("data-picker-tutorial", []);

app.directive("datapicker", function() {
	return {
		restrict: "E",
		template: "<div>This is the datapicker"
	}
})
