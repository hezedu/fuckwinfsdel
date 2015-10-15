#!/usr/bin/env node

var path = require("path");
var fs = require("fs");
var args = process.argv.slice(1);
var removeTree = require('./removeTree'); //Just a sas's demo.
var path = require('path')

args.shift();
var param = args.join(' ');
param = path.resolve(param);

/*if (param) {
  if(path.isAbsolute(param)){

  }else if (param.substr(0, 2) === './') {
    param = process.cwd() + param.substr(1);
  } else if (param[0] !== '/' || param[0] !== '\\') {
    param = process.cwd() + '/' + param;
  }
}*/

process.stdout.write('确定要删除:\u001b[91m' + param + '\u001b[39m 么? [y/n]: ');

process.stdin.setEncoding('utf8');

process.stdin.on('readable', function() {

  var chunk = process.stdin.read();
  if (chunk !== null) {
    chunk = chunk.toLowerCase();
    chunk = chunk.trim();
    if (chunk === 'y') {
      removeTree(param, function() {
        process.stdin.end();
      });
    } else {
      //console.log('取消删除');
      process.stdin.end();
    }
  }
})