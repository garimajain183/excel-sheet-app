'use strict';
angular.module('excelSheetAppApp')
  .constant('DEFAULT_ROW',7)
  .constant('DEFAULT_COLUMN',3)
  .controller('MainCtrl', ['$scope', 'Table', 'DEFAULT_ROW', 'DEFAULT_COLUMN', 
  	function ($scope, Table, DEFAULT_ROW, DEFAULT_COLUMN) {
  	// Created table object which have cells in rows and columns
  	$scope.table = new Table(DEFAULT_ROW, DEFAULT_COLUMN);
  	// Init table by creating cells provided in constructor
  	$scope.table.initTable();

  	$scope.setTableCellAsBold = function() {
  		$scope.table.setSelectedCellBold();
  	};

  	$scope.setTableCellAsItalic = function() {
  		$scope.table.setSelectedCellItalic();
  	};

  	$scope.setTableCellAsUnderline = function() {
  		$scope.table.setSelectedCellUnderline();
  	};

  }]);
