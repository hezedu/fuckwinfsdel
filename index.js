#!/usr/bin/env node
var path = require("path");
  fs = require("fs");
  args = process.argv.slice(1);
  sas = require('sas');


console.log('args ',args)
console.log('path.basename(arg) ',path.basename(arg))

do arg = args.shift();
while ( fs.realpathSync(arg) !== __filename
  && !(base = path.basename(arg)).match(/^index.js$/)
){

}
console.log(args)
//require.resolve("../sas/demo/removeTree.js")(args)