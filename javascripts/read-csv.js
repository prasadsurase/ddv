/*
function handleFiles(files) {
  // Check for the various File API support.
  if (window.FileReader) {
    // FileReader are supported.
    getAsText(files[0]);
  } 
  else {
    alert('FileReader are not supported in this browser.');
  }
}

function getAsText(fileToRead) {
  var reader = new FileReader();
  // Read file into memory as UTF-8      
  reader.readAsText(fileToRead);
  // Handle errors load
  reader.onload = loadHandler;
  reader.onerror = errorHandler;
}

function loadHandler(event) {
  var csv = event.target.result;
  scope.data.arr = processData(csv);
}

function processData(csv) {
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

function errorHandler(event) {
  if(event.target.error.name == "NotReadableError") {
    alert("Cannot read file !");
  }
}
*/
