"use strict";

angular.module("project3App", ["ngRoute", "ui.bootstrap", "sharedServices"])
.config(function ($routeProvider) {
	/* Startup page shows list of sellers*/
	$routeProvider.when("/", {
		controller: "SellersController",
		templateUrl: "components/sellers/index.html"
	});
	/* For each seller */
	$routeProvider.when("/sellers/:id", {
		controller: "SellerDetailsController",
		templateUrl: "components/seller-details/index.html"
	});
});
