"use strict";
/* UNIT TESTS FOR LANGUAGE CONTROLLER */

/*$scope, $rootScope, $routeParams, AppResource, centrisNotify*/

describe("ProductDlgController should be unit tested here", function() {

	var scope, routeParams, resource, centrisNotify, ctrl, rootScope;

	beforeEach(module("project3App"));

	beforeEach(inject(function($controller, $rootScope, $routeParams, AppResource, centrisNotify) {
		scope = 		$rootScope.$new();
		rootScope = 	$rootScope.$new();
		routeParams = 	$routeParams;
		resource = 		AppResource;
		scope.$dismiss = function () {};
		scope.$close = function () {};
		scope.success = function () {};
		scope.error = function () {};

		//centrisNotify = centrisNotify;
		//spyOn(scope, $close).and.callThrough();
		spyOn(scope, '$dismiss').and.callThrough();
		spyOn(scope, '$close').and.callThrough();

		ctrl = 			$controller("ProductDlgController", {
									$scope : 		scope,
									$rootScope : 	rootScope,
									$routeParams : 	routeParams,
									AppResource : 	resource,
									centrisNotify : centrisNotify});
	}));

	it("Setup variables should be defined.", function(){
		expect(ctrl).toBeDefined();
		expect(scope).toBeDefined();
		expect(resource).toBeDefined();
		//expect(centrisNotify).toBeDefined();
		expect(routeParams).toBeDefined();
	});

	it("should leave rootScope.updating undefinded", function () {
		scope.onCancel();
		expect(rootScope.updating).toEqual(undefined);
		expect(scope.$dismiss).toHaveBeenCalled();
	});

	it("should not call the success function", function() {
		//ctrl.checkImage('www.mbl.is', success, error;
		//expect(scope.$close).not.toHaveBeenCalled();
	});
});



/*	
	function checkImage(url, success, error) {
		var img = new Image();
		img.onload = function() {
			success();
		};
		img.onerror = function() {
			error();
		};
		img.src = url;
	}

	function setPlaceholders(){

		$rootScope.newProduct = {};
		if($rootScope.updating === undefined){
			$rootScope.newProduct = {
				name: "",
				price: "",
				quantitySold: "0",
				quantityInStock: "0",
				imagePath: ""
			};
		} else {
			AppResource.getSellerProductDetails($rootScope.updating[0], $rootScope.updating[1])
				.success(function(data){
					$rootScope.newProduct.name 		= data.name;
					$rootScope.newProduct.price 	= data.price;
					$rootScope.newProduct.imagePath = data.imagePath;
					$rootScope.newProduct.quantitySold = data.quantitySold;
					$rootScope.newProduct.quantityInStock = data.quantityInStock;

			}).error(function(){
				console.log("ERROR: Failed while fetching product to update.");
			});
		}
	}

	function nameIsTaken(name, taken, available) {
		AppResource.getSellerProducts(sellerId)
			.success(function(data) {
				for(var i = 0; i < data.length; i++){
					if(data[i]['name'] === name){
						if($scope.updating === undefined || $scope.updating[1] !== data[i].id){
							taken();
							return;
						}
						break;
					}
				}
				available();
			}).error(function() {
				centrisNotify.error("sellers.Messages.LoadFailed");
			});
	}



	setPlaceholders();
	var productPlaceholderImage = "src/components/product-dlg/productPlaceholder.jpg";
	var sellerId 			= parseInt($routeParams.id);

	$scope.onOk = function onOk(){

		if($scope.newProduct 			=== undefined 	||
			$scope.newProduct.name 		=== undefined 	|| 
			$scope.newProduct.name 		=== "" 			||
			$scope.newProduct.price 	=== undefined 	|| 
			$scope.newProduct.price 	=== "") {

				centrisNotify.warning("productDlg.InvalidInput");
		} else {

			nameIsTaken($rootScope.newProduct.name, function taken(){
				centrisNotify.warning("productDlg.NameTaken");
			}, function available() {
				checkImage($scope.newProduct.imagePath, function success(){
					$scope.$close($rootScope.newProduct);
				}, function error() {
					if($rootScope.newProduct.imagePath === ""){
						$rootScope.newProduct.imagePath = productPlaceholderImage;
						$scope.$close($rootScope.newProduct);
					} else {
						$rootScope.updating = undefined;
						centrisNotify.error("productDlg.ImageLoadFailed");
						$scope.$dismiss();
					}
				});
			});
		}
	};*/