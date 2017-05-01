'use strict';
angular.module('excelSheetAppApp')
.factory('Cell', function() {
	function Cell(value, bold, italic, underline) {
	 	this.value  = value;
	 	this.isBold = bold;
	 	this.isItalic = italic;
	 	this.isUnderline = underline;
	 	this.setBold = function(value) {
	 		this.isBold = value;
	 	}
	 	this.setItalic = function(value) {
	 		this.isItalic = value;
	 	}
	 	this.setUnderLine = function(value) {
	 		this.isUnderline = value;
	 	}
	 }
	 return Cell;
});

