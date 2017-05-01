'use strict';
angular.module('excelSheetAppApp')
.factory('Table', ['Cell', function(Cell) {
	function Table(defaultRowSize, defaultColSize) {
    	this.defaultRowSize = defaultRowSize;
    	this.defaultColumnSize = defaultColSize;
    	this.currentColumnSize = 0;
    	this.currentRowSize = 0;
    	this.data = [];
    	this.copiedRowIndex = -1;
    	this.isCopied = false;
    	this.selectedCell = {};

    	// Initialize table, create new cells if not reloaded from local cache
    	this.initTable = function() {
    		var storedData = JSON.parse(localStorage.getItem("data"));
    		// If data is stored in local cache, use it for init table data
	    	if (storedData) {
	    		// Recreating data from stored data json, need to create Cell object from json fetched from local object
	    		for (var rowIndex = 0; rowIndex < storedData.length; rowIndex++) {
	    			var columnArray = [];
		    		for (var colIndex = 0; colIndex < storedData[0].length; colIndex++) {
		    			var cell = new Cell(storedData[rowIndex][colIndex].value,storedData[rowIndex][colIndex].isBold,
		    				storedData[rowIndex][colIndex].isItalic,storedData[rowIndex][colIndex].isUnderline);
		    			columnArray.push(cell);
		    		}
		    		this.data.push(columnArray);
		    	}
	    		this.currentRowSize = this.data.length;
	    		if (this.currentRowSize > 0) {
	    			this.currentColumnSize = this.data[0].length;
	    		} else {
	    			this.currentColumnSize = 0;
	    		}
	    	} else {
	    		// Create table data with default row and comumn
	    		for (var index = 0; index < this.defaultRowSize; index++) {
	    			var columnArray = [];
		    		for (var colIndex = 0; colIndex < this.defaultColumnSize; colIndex++) {
		    			// Create cell class and push that class in column array
		    			var cell = new Cell('',false,false,false);
		    			columnArray.push(cell);
		    		}
		    		this.data.push(columnArray);
		    	}
	    		this.currentRowSize = this.defaultRowSize;
	    		this.currentColumnSize = this.defaultColumnSize;
	    	}

    	};

    	//add column at the last
    	this.addColumn = function(){
			this.currentColumnSize = this.currentColumnSize + 1;
		    //cycle all the rows and add a column to each one
		    for (var index = 0; index < this.data.length; index++) {
		    	// Create new cell object and push it in main array
		    	var cell = new Cell('',false,false,false);
		    	this.data[index].push(cell)
		    }
		 };

		// remove the last column
		this.removeColumn = function (indexToRemove) {
			this.currentColumnSize = this.currentColumnSize - 1;
		    // remove the column specified in index
		    // cycle all the rows and remove the item row by row
		    for (var index = 0; index < this.data.length; index++) {
		    	var row = this.data[index];
	        	row.splice(indexToRemove, 1);
				
		        //if no columns left in the row push a blank array
		        if (row.length === 0) {
		          row.data = [];
		        }
	        }
		};

	     // remove the selected row
		this.removeRow = function(index){
			this.currentRowSize = this.currentRowSize -1;
		    // remove the row specified in index
		    this.data.splice(index, 1);
		    // if no rows left in the array create a blank array
		    if (this.data.length === 0){
		      this.data = [];
		    }
		};

		//add a row in the array at last
		this.addRow = function(){
			this.currentRowSize = this.currentRowSize + 1;
		    // create a blank array
		    var newrow = [];
				 
		      // if array is blank add a standard item
		      if (this.data.length === 0) {
		      	var cell = new Cell('',false,false,false);
		        newrow.push(cell);
		      } else {
		        // else cycle thru the first row's columns and add the same number of items
		        for (var index = 0; index < this.data[0].length; index++) {
		        	var cell = new Cell('',false,false,false);
		        	newrow.push(cell);
		        }
		      }
		    // add the new row at the end of the array 
		    this.data.push(newrow);
		};

		// copy data of all column inside a row, storing row number to use during paste
	    this.copyRowData = function(currentRowIndex) {
	    	this.copiedRowIndex = currentRowIndex;
	    	this.isCopied = true;
	    };

	    //paste column data to any row
	    this.pasterRowData = function(currentRowIndex) {
	    	if (this.isCopied) {
	    		var rowFromCopy = this.data[this.copiedRowIndex];
	    		var rowToCopy = this.data[currentRowIndex];
	    		for (var colIndex = 0; colIndex < rowFromCopy.length; colIndex++) {
	    			rowToCopy[colIndex].value = rowFromCopy[colIndex].value;
	    			rowToCopy[colIndex].isBold = rowFromCopy[colIndex].isBold;
	    			rowToCopy[colIndex].isItalic = rowFromCopy[colIndex].isItalic;
	    			rowToCopy[colIndex].isUnderLine = rowFromCopy[colIndex].isUnderLine;
	    		}
	    	}
	    	this.isCopied = false;
	    };

	    //saving data on local storage , after refresh it will persist the data
	    this.saveTableData = function() {
	    	localStorage.setItem("data", JSON.stringify(this.data));
	    	alert('Data saved in local stoarge, refresh the page for saved results');
	    };

	    //reset data in local storage
	    this.resetTableData = function() {
	    	localStorage.setItem("data", null);
	    	alert('Data removed , on refresh fresh table will be created');
	    };

    	// functions to add specific styles
	    this.onCellInputSelect = function(rowIndex, colIndex) {
	    	this.selectedCell = this.data[rowIndex][colIndex];
	    };
	    this.setSelectedCellBold = function() {
	    	this.selectedCell.setBold(true);
	    };
	    this.setSelectedCellItalic = function() {
	    	this.selectedCell.setItalic(true);
	    };
	    this.setSelectedCellUnderline = function() {
	    	this.selectedCell.setUnderLine(true);
	    };
    }
	return Table;
}]);

