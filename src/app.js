"use strict";

angular.module("project3App", ["ngRoute", "ui.bootstrap", "sharedServices"])
.config(function ($routeProvider) {
	$routeProvider.when("/sellers", {
		controller: "SellersController",
		templateUrl: "components/sellers/index.html"
	});
});
