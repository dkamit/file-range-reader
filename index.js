"use strict";

var fs = require("fs");
var parseRange = require("range-parser");
var path = require("path");

exports.readRange = function(filePath, range, callback) {
  fs.stat(filePath, function(err, stat) {
    if(err) {
      callback(err, null);
    } else {
      var fileSize = stat.size;
      var parsedRange = parseRange(fileSize, range);
      if(parsedRange === -1) {
        callback(new Error("Invalid range"), null);
      } else if (parsedRange === -2) {
        callback(new Error("Malformed string"), null);
      } else {
        fs.open(filePath, "r", function(err, handle){
          var start = parsedRange[0].start;
          var end = parsedRange[0].end;
          var length = end - start + 1;
          var buffer = new Buffer(length);
          fs.read(handle, buffer, 0, length, start, function(err, data) {
            if(err) {
              callback(err, null);
            } else {
              callback(null, buffer);
            }
          });
        });
      }
    }
  });
};
