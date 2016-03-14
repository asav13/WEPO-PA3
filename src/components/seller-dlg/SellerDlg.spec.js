"use strict";
/* UNIT TESTS FOR SELLERS DIALOG */

describe("SellerDlg should be unit tested here", function() {

	var sellerDlg, mockUibModal;

	var mockModalInstane = {
		templateUrl: "components/seller-dlg/seller-dlg.html", 
		controller:  "SellerDlgController"
	};

	beforeEach(module("project3App"));

	beforeEach(inject(function(SellerDlg, $uibModal){

		sellerDlg 		= SellerDlg;
		mockUibModal 	= $uibModal;

		spyOn(mockUibModal, 'open').and.callThrough();

	}));

	it("test settup variables should be defined", function() {
		expect(sellerDlg).toBeDefined();
		expect(mockUibModal).toBeDefined();
	});

	it("show and open should be defined", function() {
		expect(sellerDlg.show()).toBeDefined();
		expect(mockUibModal.open).toBeDefined();
	});

	it("uibModal open should be called when sellerDlg show is called", function() {
		sellerDlg.show();
		expect(mockUibModal.open).toHaveBeenCalledWith(mockModalInstane);
	});
});