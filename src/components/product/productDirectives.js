"use strict";

angular.module("project3App").directive("product", function product() {
	return {
		restrict: "C",	// C is for class
		template: "product"
	};
});

angular.module("project3App").directive("productName", function productName() {
	return {
		restrict: "E",	// E is for element
		template:
		"<ul class=\"list-inline\">" +
			"<li class=\"btn\" role=\"button\" ng-repeat=\"prod in products\">" + 
				"<div title=\"Edit item\" ng-click=\"onUpdateSellerProduct(prod.id)\" class=\"thumbnail listLink\">" +
					"<product-photo></product-photo>" + 
					"<div class=\"caption\">" +
						"<h3>{{prod.name}}</h3>" +
						"<p>Price: {{prod.price}} EUR</p>" + 
						"<small>{{'products.Sold' | translate}}: </small>" +
						"<small>{{prod.quantitySold}}</small>" +
					"</div>" + 
				"</div>" + 
			"</li>" + 
		"</ul>",
		replace: true
	};
});

angular.module("project3App").directive("productPhoto", function productPhoto() {
	return {
		restrict: "E",
		template: "<img ng-src=\"{{prod.imagePath}}\" class=\"center-block thumbnail\" width=\"100\" height=\"100\">"
	};
});

//THIS IS FOR TOP 10 PRODUCTS
angular.module("project3App").directive("topProductName", function topProductName() {
	return {
		restrict: "E",	// E is for element
		template: 
		"<ul class=\"list-inline\">" +
			"<li class=\"btn\" role=\"button\" ng-repeat=\"prod in topTenProd\">" + 
				"<div title=\"Edit item\" ng-click=\"onUpdateSellerProduct(prod.id)\" class=\"thumbnail listLink\">" +
					"<product-photo></product-photo>" + 
					"<div class=\"caption\">" +
						"<h3>{{prod.name}}</h3>" +
						"<p>Price: {{prod.price}} EUR</p>" + 
						"<small>{{'products.Sold' | translate}}: </small>" +
						"<small>{{prod.quantitySold}}</small>" +
					"</div>" + 					
				"</div>" + 
			"</li>" + 
		"</ul>",
		replace: true
	};
});