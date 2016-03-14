"use strict";
/* UNIT TESTS FOR PRODUCT DIRECTIVES */

describe("Product directive", function() {
	var scope, resource, compile, element, directiveElem, sellerDetailsController;
	
	beforeEach(module("project3App"));
	beforeEach(inject(function($controller, $rootScope, $compile, AppResource) {
		scope 			= $rootScope.$new();
		resource 		= AppResource;
		compile 		= $compile;
		element 		= angular.element("<div product></div>");
		directiveElem 	= compile(element)(scope);

		sellerDetailsController = $controller("SellerDetailsController", { 
			$scope: 		scope,
			AppResource: 	resource
		});
	}));

	it("test variables should be defined", function() {
		expect(sellerDetailsController).toBeDefined();
		expect(scope).toBeDefined();
		expect(element).toBeDefined();
		expect(resource).toBeDefined();
	});

	it("should contain the productName function", function() {
		expect(directiveElem).toBeDefined();
	});

	it("should add class 'product' to element", function() {
		expect(directiveElem.hasClass("product"));
	});

	it("should contain the product-name directive", function() {
		var productName = directiveElem.find('product-name');
		expect(productName).toBeDefined();
	});

	it("should have an <ul> element appended", function() {
		var ul = directiveElem.find('ul');
		expect(ul).toBeDefined();
	});

	it("should list as many products as there are in the data", function() {
		var productBoxNr = directiveElem.find('ul').children('li').length;
		expect(productBoxNr).toEqual(scope.products.length);
	});

	describe("product-name and top-product-name", function() {
		var elem2;
		var directiveElem2;
		beforeEach(function() {
			element 		= angular.element("<product-name></product-name>");
			elem2 			= angular.element("<top-product-name></top-product-name>")
			directiveElem 	= compile(element)(scope);
			directiveElem2 	= compile(elem2)(scope)
		});

		it("should exist", function() {
			expect(directiveElem).toBeDefined();
			expect(directiveElem2).toBeDefined();
		});

		it("should contain the product-card directive", function() {
			var productCard = directiveElem.children().find('product-card');
			expect(productCard).toBeDefined();
		});
	});
	describe("product-card", function() {
		beforeEach(function() {
			element 		= angular.element("<product-card></product-card>");
			directiveElem 	= compile(element)(scope);
		});

		it("should exist", function() {
			expect(directiveElem).toBeDefined();
		});

		it("should contain the product-photo directive", function() {
		var productPhoto = directiveElem.find('product-photo');
			expect(productPhoto).toBeDefined();
		});
	});
});
