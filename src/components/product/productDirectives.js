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
			"<li class=\"btn\" role=\"button\" ng-repeat=\"prod in products | filter:searchText\">" + 
				"<product-card></product-card>" +
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
			"<li class=\"btn\" role=\"button\" ng-repeat=\"prod in topTenProd | filter:searchText\">" + 
				"<product-card></product-card>" +
			"</li>" + 
		"</ul>",
		replace: true
	};
});

angular.module("project3App").directive("productCard", function productCard() {
	return {
		restrict: "E",
		template: 	"<div title=\"Edit item\" ng-click=\"onUpdateSellerProduct(prod.id)\" class=\"thumbnail listLink\">" +
						"<product-photo></product-photo>" + 
						"<product-caption></product-caption>" +
					"</div>"
	};
});

angular.module("project3App").directive("productCaption", function productCaption() {
	return {
		restrict: "E",
		template: "<div class=\"caption\">" +
						"<h3>{{prod.name}}</h3>" +
						"<p>{{'products.Price' | translate}}: {{prod.price}} ISK</p>" + 
						"<small>{{'products.Sold' | translate}}: </small>" +
						"<small>{{prod.quantitySold}}</small><br>	" +
						"<div ng-if=\"prod.quantityInStock\" class=\"text-success\">" +
						"<small><i>{{'products.InStock' | translate}}: </i></small>" +
							"<small><i>{{prod.quantityInStock}}</small></i>" +
						"</div>" +
						"<div ng-if=\"!prod.quantityInStock\" class=\"text-danger\">" +
							"<small><i>{{'products.InStock' | translate}}:</i> </small>" +
							"<small><i>none</small></i>" +
						"</div>" +
					"</div>"
	};
});