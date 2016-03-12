"use strict";

angular.module("project3App", ["ngRoute", "ui.bootstrap", "sharedServices", "pascalprecht.translate"])
.config(function ($routeProvider, $translateProvider) {
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

	$translateProvider.useStaticFilesLoader({
		files: [{
			prefix: "lang_",
			suffix: ".json"
			//}, {
				//prefix:
				//suffix:
			//}
		}]
	});
	//$translate.use("is");
	$translateProvider.preferredLanguage("is");

	//moment.locale("is");
});
