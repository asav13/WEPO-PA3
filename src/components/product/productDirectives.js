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
		template: "<p>Name: " + "Vedis(productName)<p>"
	};
})

angular.module("project3App").directive("productPhoto", function productPhoto() {
	return {
		restrict: "A",	// A is for Attribute
		template: "<img src=\"http://i.imgur.com/3G0VURAb.jpg\">"
	};
})