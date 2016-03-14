"use strict";
/* UNIT TESTS FOR PRODUCT DIALOG CONTROLLER */

describe("ProductDlgController should be unit tested here", function() {

	var productDlgController, scope, routeParams, resource, cNotify;

	beforeEach(module("project3App"));

	beforeEach(inject(function($controller, $rootScope, $routeParams, AppResource, centrisNotify) {
		scope 			= $rootScope;
		routeParams 	= $routeParams;
		resource 		= AppResource;
		cNotify 		= centrisNotify;
		scope.updating 	= undefined;

		scope.$dismiss 	= function () {};
		scope.$close 	= function () {};
		scope.success 	= function () {};
		scope.error 	= function () {};

		spyOn(scope, '$dismiss').and.callThrough();
		spyOn(scope, '$close').and.callThrough();
		spyOn(cNotify, 'warning').and.callThrough();

		productDlgController 	= $controller("ProductDlgController", {
			$scope : 		scope,
			$routeParams : 	routeParams,
			AppResource : 	resource,
			centrisNotify : cNotify});
		}));

	it("Setup variables should be defined.", function() {
		expect(productDlgController).toBeDefined();
		expect(scope).toBeDefined();
		expect(resource).toBeDefined();
		expect(cNotify).toBeDefined();
		expect(routeParams).toBeDefined();
	});

	it("should leave scope.updating undefinded", function () {
		scope.onCancel();
		expect(scope.updating).toEqual(undefined);
		expect(scope.$dismiss).toHaveBeenCalled();
	});

	it("should set isOpen to true after calling onOk", function() {
		scope.onOk();
		expect(scope.isOpen).toEqual(true);
	});

	it("adding with valid input should succeed", function() {
		scope.updating = undefined;
		scope.newProduct = {
			name: 		"Product",
			price: 		"50",
			imagePath: 	""
		};

		scope.onOk();
		expect(cNotify.warning).not.toHaveBeenCalled();
	});

	it("adding with invalid imagePath should NOT succeed", function() {
		scope.newProduct = {
			name: 		"Product",
			price: 		"50",
			imagePath: 	"troll"
		};

		scope.onOk();
		expect(cNotify.warning).not.toHaveBeenCalled();
	});

	it("adding with invalid input should give warning but keep dialog open", function() {
		scope.updating 		= undefined;
		scope.newProduct 	= {
			name : 		"A",
			price : 	""
		};

		scope.onOk();
		expect(cNotify.warning).toHaveBeenCalledWith("productDlg.InvalidInput");
		expect(scope.isOpen).toEqual(true);
	});

	it("adding with a product name the seller is already using should give warning but keep dialog open", function() {
		/* Hannyrðastofa Hannesar already has a product called sjal*/
		scope.sellerId 		= 1;
		scope.newProduct 	= {
			name : 		"Sjal",
			price: 		"500",
		};

		scope.onOk();
		expect(cNotify.warning).toHaveBeenCalledWith("productDlg.NameTaken");
		expect(scope.isOpen).toEqual(true);
	});

	it("adding with a product invalid img path should", function() {
		/* Hannyrðastofa Hannesar already has a product called sjal*/
		scope.sellerId 		= 1;
		scope.newProduct 	= {
			name : 		"Troll",
			price: 		"500",
			imgPath: 	""
		};

		scope.onOk();
		expect(scope.isOpen).toEqual(true);
	});

});

describe("ProductDlgController should be unit tested here, updating", function() {
	var scope, routeParams, resource, cNotify, productDlgController;

	beforeEach(module("project3App"));

	beforeEach(inject(function($controller, $rootScope, $routeParams, AppResource, centrisNotify) {
		scope 				= 		$rootScope;
		routeParams 		= 	$routeParams;
		resource 			= 		AppResource;
		cNotify 			= 		centrisNotify;
		scope.updating 		= {};
		scope.updating[0] 	= 1;
		scope.updating[1] 	= 1;

		scope.$dismiss 		= function () {};
		scope.$close 		= function () {};
		scope.success 		= function () {};
		scope.error 		= function () {};

		spyOn(scope, '$dismiss').and.callThrough();
		spyOn(scope, '$close').and.callThrough();
		spyOn(cNotify, 'warning').and.callThrough();

		productDlgController 				= $controller("ProductDlgController", {
									$scope : 		scope,
									$routeParams : 	routeParams,
									AppResource : 	resource,
									centrisNotify : cNotify});
	}));

	it("Setup variables should be defined.", function() {
		expect(productDlgController).toBeDefined();
		expect(scope).toBeDefined();
		expect(resource).toBeDefined();
		expect(cNotify).toBeDefined();
		expect(routeParams).toBeDefined();
	});

	it("", function(){
		scope.onOk();
		expect(scope.isOpen).toEqual(true);
	});

	it("updating with valid input should succeed", function() {
		scope.updating = undefined;
		scope.newProduct = {
			name: 		"Product",
			price: 	"50",
			imagePath: "https://http.cat/201"
		};

		scope.onOk();
		expect(cNotify.warning).not.toHaveBeenCalled();
	});

	it("updating with invalid input should give warning but keep dialog open", function() {
		scope.updating = undefined;
		scope.newProduct = {
			name : 		"A",
			price : 	""
		};

		scope.onOk();
		expect(cNotify.warning).toHaveBeenCalledWith("productDlg.InvalidInput");
		expect(scope.isOpen).toEqual(true);
	});

	it("updating with a product name the seller is already using should be OK if updating the same product", function() {
		/* Hannyrðastofa Hannesar already has a product called sjal, it's ID is 4*/
		scope.sellerId 		= 1;
		scope.updating[0] 	= 1; 
		scope.updating[1] 	= 4; 
		scope.newProduct = {
			name : 		"Sjal",
			price: 		"500"
		};

		scope.onOk();
		expect(cNotify.warning).not.toHaveBeenCalledWith("productDlg.NameTaken");
		expect(scope.isOpen).toEqual(true);
	});

});