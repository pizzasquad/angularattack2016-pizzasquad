var fs = require("fs");

var fileIn = process.argv[2];
console.log("Reading", fileIn);

var content = fs.readFileSync(fileIn).toString();

var array = content.split("\r\n");
var matrix = [];

var width = 10;
var height = 10;

array.forEach(function (val, index) {
    var tmpArray = val.split(" ");
    if (index > 0)
        matrix.push(tmpArray);
    else {
        width = tmpArray[0];
        height = tmpArray[1];
    }
});

for (var i = 0; i < width; i++)
    for (var j = 0; j < height; j++)
        if (matrix[i][j] == '1')
            console.log('{"x": ' + i + ', "y": ' + j + '},');
