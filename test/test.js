var assert = require('assert');
var range = require('../');
var fs = require('fs');
var should = require('chai').should();

describe('readRange(filePath, range,callback)', function(){
  it('Should return error for non existing file', function(){
    range.readRange('/tmp/unkown/file.txt','bytes=10-20',function(err, data){
      should.exists(err);
    });
  });

  it('Should return error for invalid range request', function(){
    range.readRange('test/file.txt','bytes=1000-2', function(err, data){
      should.exists(err);
      assert.StrictEqual(err.message, "Invalid range");
    });
  });

  it('Should return error for malformed range request', function(){
    range.readRange('test/file.txt','malformed', function(err, data){
      should.exists(err);
      assert.StrictEqual(err.message, "Malformed string");
    });
  });

  it('Should return range of bytes', function(){
    range.readRange('test/file.txt','bytes=5-9', function(err, data){
      console.log(data.toString('UTF-8'));
      assert.StrictEqual(data.toString('UTF-8', "w are"));
    });
  });
});
