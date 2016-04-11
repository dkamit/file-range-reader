"use strict";

var fs = require("fs");
var parseRange = require("range-parser");
var mkdirp = require("mkdirp");
var path = require("path")

exports.readRange = function(fd, range, callback) {
  fs.stat(fd, function(err, stat) {
    if(err) {
      callback(err, null);
    } else {
      var fileSize = stat.size;
      var parsedRange = parseRange(fileSize, range);
      if(parsedRange === -1) {
        callback(new Error("signals an invalid range"), null);
      } else if (parsedRange === -2) {
        callback(new Error("signals a malformed header string"), null);
      } else {
        var start = parsedRange[0].start;
        var end = parsedRange[0].end;
        var length = end - start + 1;
        var buffer = new Buffer(length);
        fs.read(fd, buffer, 0, length, start, function(err, data) {
          if(err) {
            callback(err, null);
          } else {
            callback(null, data);
          }
        });
      }
    }
  });
};

exports.ensureFile = function(fd, flags, mode, callback) {
  var dirname = path.dirname(fd);
  if (typeof mode == 'function') {
        callback = mode;
        mode = parseInt('0777', 8);
  }
  mkdirp(dirname, mode, function(err,data) {
    if(err) {
      callback(err, null);
    } else {
      fs.open(fd, flags, callback);
    }
  });
};

exports.ensureCopy = function(source, dest, mode, callback) {
  var dirname = path.dirname(dest);
  if (typeof mode == 'function') {
        callback = mode;
        mode = 777;
  }
  mkdirp(dirname, mode, function(err,data) {
    if(err) {
      callback(err, null);
    } else {
      var sourceStream = fs.createReadStream(source);
      var destStream = fs.createWriteStream(dest);
      sourceStream.on("error", function(err) {
        callback(err, null);
      });
      destStream.on("error", function(err) {
        callback(err, null);
      });
      destStream.on("finish", function(err, data) {
        callback(null, dest);
      });
    }
  });
};
