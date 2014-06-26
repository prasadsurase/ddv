'use strict';
/*Data Controller*/

var ddvControllers = angular.module('ddvControllers', []);
console.log('outside controller');

ddvControllers.controller('DataController', ['$scope', function($scope){

  $scope.data = {};
  console.log('inside controller');
  $scope.handleFile = function(files) {
    console.log('got in function');
    // Check for the various File API support.
    if (window.FileReader) {
      // FileReader are supported.
      getAsText(files[0]);
    } 
    else {
      alert('FileReader are not supported in this browser.');
    }
  }

  $scope.getAsText = function(fileToRead) {
    var reader = new FileReader();
    // Read file into memory as UTF-8      
    reader.readAsText(fileToRead);
    // Handle errors load
    reader.onload = loadHandler;
    reader.onerror = errorHandler;
  }

  $scope.loadHandler = function(event) {
    var csv = event.target.result;
    $scope.data.arr = processData(csv);
  }

  $scope.processData = function(csv) {
    var allTextLines = csv.split(/\r\n|\n/);
    var lines = [];
    for (var i = 0; i < allTextLines.length; i++) {
      var data = allTextLines[i].split(',');
      var arr = [];
      for (var j = 0; j < data.length; j++) {
        arr.push(data[j].trim());
      }
      lines.push(arr);
    }
    return lines;
  }

  $scope.errorHandler = function(event) {
    if(event.target.error.name == "NotReadableError") {
      alert("Cannot read file !");
    }
  }

}]);

