"use strict";
/* UNIT TESTS FOR PRODUCT DIALOG  CONTROLLER */

describe("ProductDlg should be unit tested here", function() {

	var productDlg, mockUibModal;

	var mockModalInstane = {
		templateUrl: "components/product-dlg/product-dlg.html", 
		controller:  "ProductDlgController"
	};

	beforeEach(module("project3App"));

	beforeEach(inject(function(ProductDlg, $uibModal){

		productDlg 		= ProductDlg;
		mockUibModal 	= $uibModal;

		spyOn(mockUibModal, 'open').and.callThrough();

	}));

	it("test settup variables should be defined", function() {
		expect(productDlg).toBeDefined();
		expect(mockUibModal).toBeDefined();
	});

	it("show and open should be defined", function() {
		expect(productDlg.show()).toBeDefined();
		expect(mockUibModal.open).toBeDefined();
	});

	it("uibModal open should be called when ProductDlg show is called", function() {
		productDlg.show();
		expect(mockUibModal.open).toHaveBeenCalledWith(mockModalInstane);
	});
});