'use strict';
angular.module('excelSheetAppApp')
.directive('setStyle', function(){
    return function (scope, element, attrs) {
        var shiftDown = false;
        element.bind("keydown", function (event) {
            // shift key code 16
            if(event.which === 16) {
                shiftDown = true;
            }
            // if shift + b is pressed then we change style to bold
            if(event.which === 66 && shiftDown) {
                event.preventDefault();
                scope.setTableCellAsBold();
                scope.$apply();
            }
            // if shift + i is pressed then we change style to bold
            if(event.which === 73 && shiftDown) {
                event.preventDefault();
                scope.setTableCellAsItalic();
                scope.$apply();
            }
            // if shift + u is pressed then we change style to bold
            if(event.which === 85 && shiftDown) {
                event.preventDefault();
                scope.setTableCellAsUnderline();
                scope.$apply();
            }
        });

    };
})