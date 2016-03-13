"use strict";

angular.module("project3App").controller("LanguageController",
function LanguageController($translate, $scope) {

	$scope.changeLanguage = function(lang) {
		$translate.use(lang);
	};
});