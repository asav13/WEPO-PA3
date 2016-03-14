"use strict";

/* UNIT TESTS FOR SELLER DETAILS CONTROLLER */
describe("SellerDetailsController should be unit tested here", function() {
	var sellerDetailsController, scope, resource, routeParams, mockLocation;

	beforeEach(module("project3App"));


	var mockProduct = {name: "mockSeller", price: 100};

	var mockProductDlg = {
		show: function() {
			return {
				then: function(fn){
					fn(mockProduct);
				}
			};
		}
	};

	/* Inject: Get access */
	beforeEach(inject(function($controller, $location, $rootScope, $routeParams, AppResource, ProductDlg) {
		scope 				= $rootScope.$new();
		resource 			= AppResource;
		routeParams 		= $routeParams;
		routeParams.id 		= 1;
		mockLocation 		= $location;

		mockLocation.path 	= "/sellers/1";

		spyOn(resource, 'getSellerDetails').and.callThrough();
		spyOn(resource, 'getSellerProducts').and.callThrough();
		spyOn(mockProductDlg, 'show').and.callThrough();
		spyOn(mockLocation, "path");

		sellerDetailsController = $controller("SellerDetailsController", { 
			$scope: 		scope,
			$location: 		mockLocation,
			AppResource: 	resource,
			ProductDlg: 	mockProductDlg,
			$routeParams: 	routeParams
			});
	}));

	it("test setup variables should be defined.", function() {
		expect(sellerDetailsController).toBeDefined();
		expect(scope).toBeDefined();
		expect(mockLocation).toBeDefined();
		expect(resource).toBeDefined();
		expect(mockProductDlg).toBeDefined();
	});

	it("getSellerDetails should be called as the page is entered, with the correct id", function() {
		expect(resource.getSellerDetails).toHaveBeenCalledWith(routeParams.id);
	});

	it("getSellerProducts should be called as the page is entered, with the correct id", function() {
		expect(resource.getSellerProducts).toHaveBeenCalledWith(routeParams.id);
		expect(scope.noProducts).toEqual(false);
	});

	it("add new product should open productDlg", function() {
		scope.onAddProduct();
		expect(mockProductDlg.show).toHaveBeenCalled();
	});

	it("update product should open productDlg", function() {
		scope.onUpdateSellerProduct(1);
		expect(mockProductDlg.show).toHaveBeenCalled();
	});

	it("calling selectedValue for product sorting should change the title in the dropdown", function() {
		// To reach code coverage we should not sort by name A-Z and then Z-A right after
		scope.selectedValue(1);
		expect(scope.dropdown.title).toEqual(scope.dropdown.value1);
		
		scope.selectedValue(3);
		expect(scope.dropdown.title).toEqual(scope.dropdown.value3);
		
		scope.selectedValue(4);
		expect(scope.dropdown.title).toEqual(scope.dropdown.value4);

		scope.selectedValue(2);
		expect(scope.dropdown.title).toEqual(scope.dropdown.value2);

		scope.selectedValue();
		expect(scope.dropdown.title).toEqual("Order by");
	});

	it("when updating products the helper function should replace empty values with the old ones",function() {
		var updatedProd1 = {
			name: 	"Updated name",
			price: 	"100",
		};
		var updatedProd2 = {
			name: 		"",
			price: 		"",
			imagePath: 	""
		};

		var afterCheck = scope.testUpdates(1,updatedProd1);
		expect(afterCheck.name).toEqual(updatedProd1.name);
		expect(afterCheck.price).toEqual(updatedProd1.price);

		var afterCheck2 =scope.testUpdates(1,updatedProd2);
		expect(afterCheck2.name).not.toEqual("");
		expect(afterCheck2.price).not.toEqual("");

	});
});

describe("SellerDetailsController should be unit tested here, seller with no products", function() {
	var sellerDetailsController, scope, resource, routeParams, mockLocation;

	beforeEach(module("project3App"));

	beforeEach(inject(function($controller, $location, $rootScope, $routeParams, AppResource) {
		scope 				= $rootScope.$new();
		resource 			= AppResource;
		routeParams 		= $routeParams;
		routeParams.id 		= 2;
		mockLocation 		= $location;
		mockLocation.path 	= "/sellers/1";

		spyOn(resource, 'getSellerDetails').and.callThrough();
		spyOn(resource, 'getSellerProducts').and.callThrough();
		spyOn(mockLocation, "path");

		sellerDetailsController = $controller("SellerDetailsController", { 
			$scope: 		scope,
			$location: 		mockLocation,
			AppResource: 	resource,
			$routeParams: 	routeParams
			});
		
	}));

	it("scope and mockLocation should be defined.", function() {
		expect(sellerDetailsController).toBeDefined();
		expect(scope).toBeDefined();
		expect(mockLocation).toBeDefined();
		expect(resource).toBeDefined();
		expect(routeParams).toBeDefined();
	});

	it("getSellerDetails should be called as the page is entered", function() {
		expect(resource.getSellerDetails).toHaveBeenCalledWith(2);
	});

	it("getSellerProducts should be called as the page is entered, and noProducts set to true", function() {
		expect(resource.getSellerProducts).toHaveBeenCalledWith(2);
		expect(scope.noProducts).toEqual(true);
	});

});

describe("SellerDetailsController should be unit tested here, testing failures", function() {

	var sellerDetailsController, scope, resource, cNotify;

	beforeEach(module("project3App"));

	var mockProduct = {name: "mockSeller", price: 100};

	var mockProductDlg = {
		show: function() {
			return {
				then: function(fn){
					fn(mockProduct);
				}
			};
		}
	};

	/* Inject: Get access */
	beforeEach(inject(function($controller, $rootScope, AppResource, ProductDlg, centrisNotify) {
		scope 								= $rootScope.$new();
		resource 							= AppResource;
		resource.successGetSellerProducts 	= false;
		resource.successLoadSellerDetails 	= false;
		resource.successUpdateSellerProduct = false;
		resource.successAddProduct 			= false;
		cNotify 							= centrisNotify;
		
		spyOn(resource, 'getSellerDetails').and.callThrough();
		spyOn(resource, 'getSellerProducts').and.callThrough();
		spyOn(mockProductDlg, 'show').and.callThrough();
		spyOn(cNotify, 'error').and.callThrough();

		sellerDetailsController = $controller("SellerDetailsController", { 
			$scope: 		scope,
			AppResource: 	resource,
			ProductDlg: 	mockProductDlg,
			centrisNotify: 	cNotify
			});

	}));

	it("scope and mockLocation should be defined.", function() {
		expect(sellerDetailsController).toBeDefined();
		expect(scope).toBeDefined();
		expect(resource).toBeDefined();
		expect(mockProductDlg).toBeDefined();
		expect(cNotify).toBeDefined();
	});

	it("when getSellerDetails fails and error message should be shown", function() {
		expect(resource.getSellerDetails).toHaveBeenCalled();
		expect(cNotify.error).toHaveBeenCalled();
	});

	it("when getSellerProducts fails and error message should be shown", function() {
		expect(resource.getSellerProducts).toHaveBeenCalled();
		expect(cNotify.error).toHaveBeenCalled();
	});

	it("add new product should open ", function() {
		scope.onAddProduct();
		expect(mockProductDlg.show).toHaveBeenCalled();
		expect(cNotify.error).toHaveBeenCalled();
	});

	it("update product should open productDlg", function() {
		scope.onUpdateSellerProduct(1);
		expect(mockProductDlg.show).toHaveBeenCalled();
		expect(cNotify.error).toHaveBeenCalled();
	});

});