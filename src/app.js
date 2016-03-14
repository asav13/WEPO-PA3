"use strict";

angular.module("project3App", ["ngRoute", "ui.bootstrap", "sharedServices", "pascalprecht.translate"])
.config(function ($routeProvider, $translateProvider) {
	/* Startup page shows list of sellers */
	$routeProvider.when("/", {
		controller: "SellersController",
		templateUrl: "components/sellers/index.html"
	});
	/* Details for each seller */
	$routeProvider.when("/sellers/:id", {
		controller: "SellerDetailsController",
		templateUrl: "components/seller-details/index.html"
	});

	$translateProvider.useStaticFilesLoader({
		prefix: "lang_",
		suffix: ".json"
	});

	$translateProvider.preferredLanguage("en");	//For Laura <3
	$translateProvider.fallbackLanguage("en");
	/* To get rid of a sanitazion warning */
	$translateProvider.useSanitizeValueStrategy('sanitize');
	$translateProvider.useSanitizeValueStrategy('escapeParameters');
	$translateProvider.useSanitizeValueStrategy('escape');
	$translateProvider.useSanitizeValueStrategy('sanitizeParameters');

});
