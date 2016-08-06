#!/usr/bin/env node

var fs = require("fs");
var args = process.argv.slice(1);
var removeTree = require('./removeTree'); //Just a sas's demo.

args.shift();
var param = args.join(' ');

process.stdout.write('确定要删除:\u001b[91m' + param + '\u001b[39m 么? [y/n]:');

process.stdin.setEncoding('utf8');

process.stdin.on('readable', function() {
  var chunk = process.stdin.read();
  if (chunk !== null) {
    chunk = chunk.toLowerCase();
    chunk = chunk.trim();
    if (chunk === 'y') {
      removeTree(param, function() {
        //process.stdin.end();
      });
    }
      process.stdin.end();
  }
})