"use strict";
/* UNIT TESTS FOR PRODUCT DIRECTIVES */

describe("Product directive", function() {
	//var template = "<div product></div>";
	var scope, resource, compile, element;
	var directiveElem, sellerDetailsController;
	var backend;
	
	beforeEach(module("project3App"));
	beforeEach(inject(function($controller, $rootScope, $compile, AppResource) {
		scope = $rootScope.$new();
		resource = AppResource;
		compile = $compile;
		element = angular.element("<div product></div>");
		directiveElem = compile(element)(scope);

		sellerDetailsController = $controller("SellerDetailsController", { 
			$scope: 		scope,
			AppResource: 	resource
		});
		//$httpBackend.expectGET("../src/components/seller-details/index.html").respond("<div class=\"product\"");
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
		/*element = compile(template)(scope);
		backend.flush();
		var isolatedScope = element.isolatedScope();
		expect(isolatedScope.class).toBe(product);*/
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
			element = angular.element("<product-name></product-name>");
			elem2 = angular.element("<top-product-name></top-product-name>")
			directiveElem = compile(element)(scope);
			directiveElem2 = compile(elem2)(scope)
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
			element = angular.element("<product-card></product-card>");
			directiveElem = compile(element)(scope);
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


/*

describe("when editing", function() {
	it("should initialize properly", function() {
		// Compile the HTML fragment into our directive object:
		element = compile(template)(scope);
		// Since the directive uses a templateUrl, we must flush
		// the HTTP pipeline to ensure the template is properly loaded:
		backend.flush();
		// Now we can start examining the scope of our directive.
		// Since it uses isolated scope, any changes it makes
		// to the scope object only affect its own scope,
		// which we must access explicitly:
		var isolatedScope = element.isolateScope();
		// Use regular expect() methods to check on the contents of
		// the directive scope, i.e. by using "isolatedScope" instead
		// of "scope".
		expect(scope.whatever).not.toBeDefined();
	});
});
// Etc., more describe() blocks, and more it() blocks as well...
});



describe("myCustom directive", function() {
	var template = "<my-custom-directive ng-model='smu' allow-edit='allow' ></my-custom-directive>";
	var scope;
	var compile;
	var element;
	var backend;
	beforeEach(module("project3App"));
	beforeEach(inject(function($rootScope, $compile, $httpBackend) {
		scope = $rootScope.$new();
		compile = $compile;
		backend = $httpBackend;
		// We must declare the scope properties, they can be changed in each
		// describe block before we compile the directive. They don't need
		// to have a value however.
		scope.smu = undefined;
		scope.allow = false;
		// Doesn't really matter what the HTML looks like which is returned
		// when querying for the template...
		$httpBackend.expectGET("path/to/directive/template.html").respond("<div></div>");
}));
	*/