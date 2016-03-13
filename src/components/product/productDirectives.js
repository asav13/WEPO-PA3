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
			"<li ng-repeat=\"prod in products\">" + 
				"<div class=\"thumbnail\">" +
					"<product-photo></product-photo>" + 
					"<div class=\"caption\">" +
						"<h3>{{prod.name}}</h3>" +
						"<p>Price: {{prod.price}}</p>" + 
						"<span>{{'products.Sold' | translate}}: </span>" +
						"<span>{{prod.quantitySold}}</span>" +
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
			"<li ng-repeat=\"prod in topTenProd\">" + 
				"<div class=\"thumbnail\">" +
					"<product-photo></product-photo>" + 
					"<div class=\"caption\">" +
						"<h3>{{prod.name}}</h3>" +
						"<p>Price: {{prod.price}}</p>" + 
						"<span>{{'products.Sold' | translate}}: </span>" +
						"<span>{{prod.quantitySold}}</span>" +
					"</div>" + 					
				"</div>" + 
			"</li>" + 
		"</ul>",
		replace: true

		//template: "<ul><li ng-repeat=\"topProd in topTenProd\">{{topProd.name}}<br><div top-product-photo></top-product-photo></li></ul>"
	};
});

angular.module("project3App").directive("topProductPhoto", function topProductPhoto() {
	return {
		restrict: "A",
		template: "<img ng-src=\"{{prod.imagePath}}\"  height=\"100\">"
	};
});