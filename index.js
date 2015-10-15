#!/usr/bin/env node
var path = require("path")
  , fs = require("fs")
  , args = process.argv.slice(1)
  ,sas = require('sas');
var arg, base;
do arg = args.shift();
while ( fs.realpathSync(arg) !== __filename
  && !(base = path.basename(arg)).match(/^fuckwinfsdel$/)
)
console.log(args)
//require.resolve("../sas/demo/removeTree.js")(args)