"use strict";

angular.module("project3App").factory("ProductDlg",
function ProductDlg($uibModal) {
	return {
		show: function() {
			var modalInstance = $uibModal.open( {
				templateUrl: "components/product-dlg/product-dlg.html", 
				controller:  "ProductDlgController"
			});

			return modalInstance.result;
		}
	};
});