//TODO figure out how to do this for all products...

angular.module("project3App").directive("product", function product() {
	return {
		restrict: "C",	// C is for class
		template: "product"
	};
})

angular.module("project3App").directive("productName", function productName() {
	return {
		restrict: "E",	// E is for element
		template: "<ul><li ng-repeat=\"prod in products\">{{prod.name}}<br><product-photo></product-photo></li></ul>"
	};
})

angular.module("project3App").directive("productPhoto", function productPhoto() {
	return {
		restrict: "E",
		template: "<img ng-src=\"{{prod.imagePath}}\" width=\"50px\" height=\"50px\">"
	};
})

//THIS IS FOR TOP 10 PRODUCTS
angular.module("project3App").directive("topProductName", function topProductName() {
	return {
		restrict: "E",	// E is for element
		template: "<ul><li ng-repeat=\"topProd in topTenProd\">{{topProd.name}}<br><div top-product-photo></top-product-photo></li></ul>"
	};
})

angular.module("project3App").directive("topProductPhoto", function topProductPhoto() {
	return {
		restrict: "A",
		template: "<img ng-src=\"{{topProd.imagePath}}\" width=\"50px\" height=\"50px\">"
	};
})