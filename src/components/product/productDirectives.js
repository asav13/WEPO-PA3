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
			"<div class=\"col-xs-6 col-sm-3\" ng-repeat=\"prod in products\">" + 
				"<div class=\"thumbnail\">" +
					"<product-photo></product-photo>" + 
						"<div class=\"caption\">" +
							"<h4>{{prod.name}}</h4>" +
							"<p>{{prod.price}}</p>" + 
							"<span>{{'products.Sold' | translate}}: </span>" +
							"<span>{{prod.quantitySold}}</span>" +
						"</div>" + 
					"</div>" + 
				"</div>" + 
			"</div>",
		replace: true
	};
});

angular.module("project3App").directive("productPhoto", function productPhoto() {
	return {
		restrict: "E",
		template: "<img ng-src=\"{{prod.imagePath}}\" class=\"img-responsive center-block\" height=\"100\">"
	};
});

//THIS IS FOR TOP 10 PRODUCTS
angular.module("project3App").directive("topProductName", function topProductName() {
	return {
		restrict: "E",	// E is for element
		template: 	"<table class=\"table table-hover\">" +
						"<thead>" +
							"<tr table-sort=Name>" +
								"<th data-columnName=\"WHAT\" colspan=\"2\"><a class=\"btn btn-default btn-block\">Name</a></th>" +
								"<th data-columnName=\"WHUT\" colspan=\"2\"><a class=\"btn btn-default btn-block\">Price</a></th>" +
								"<th data-columnName=\"WHIT\" colspan=\"2\"><a class=\"btn btn-default btn-block\">Sold</a></th>" +
								"<th data-columnName=\"SLUT\" colspan=\"2\"><a class=\"btn btn-default btn-block\">InStock</a></th>" +
							"<th></th>" +
							"</tr>" +
						"</thead>" +
						"<tbody>" +
							"<tr ng-repeat=\"prod in topTenProd | orderBy:predicate:reverse\">" +
								"<td class=\"text-center\" role=\"button\" scope=\"row\" ng-click=\"seeDetails(prod.id)\">" +
									"<div top-product-photo></top-product-photo>" + //this displays what is in the topProductPhoto function below! :)
								"</td>" +
								"<td>{{prod.name}}</td>" +
								"<td>{{prod.price}} EUR</td>" +
								"<td>{{prod.quantitySold}}</td>" +
								"<td>{{prod.quantityInStock}}</td>" +
								//"<td role=\"button\" ng-click=\"seeDetails(topTenProd.id)\">{{topTenProd.name}}</td>" +
								//"<td role=\"button\" ng-click=\"seeDetails(topTenProd.id)\">{{topTenProd.category}}</td>" +
								"<td><a title=\"Edit\" ng-click=\"onUpdateSeller(prod.id)\"><span class=\"btn btn-primary glyphicon glyphicon-edit\"></span></a></td>" +
							"</tr>" +
						"</tbody>" +
					"</table>"

		//template: "<ul><li ng-repeat=\"topProd in topTenProd\">{{topProd.name}}<br><div top-product-photo></top-product-photo></li></ul>"
	};
});

angular.module("project3App").directive("topProductPhoto", function topProductPhoto() {
	return {
		restrict: "A",
		template: "<img ng-src=\"{{prod.imagePath}}\"  height=\"100\">"
	};
});