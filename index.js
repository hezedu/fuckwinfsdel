#!/usr/bin/env node

var args = process.argv.slice(1);
var removeTree = require('./removeTree'); //Just a sas's demo.

args.shift();
var param = args.join(' ');

process.stdout.write('Are you sure to delete :\u001b[91m' + param + '\u001b[39m ? [y/n]:');

process.stdin.setEncoding('utf8');

process.stdin.on('readable', function() {
  var chunk = process.stdin.read();
  if (chunk !== null) {
    chunk = chunk.toLowerCase();
    chunk = chunk.trim();
    if (chunk === 'y') {
      
      console.log('Deleting...');
      var time = Date.now();
      removeTree(param, {processLog: true}, function(err, result) {
        if (err) {
          console.error('\nDelete failed');
        } else {
          var msg = '\n';
          var errCount = result.errCount;
          if(errCount){
            msg += 'End, A total of \u001b[91m' + errCount + '\u001b[39m files deleted failed, Please close other programs that may occupy the folder and try again.\n';
          }else{
            msg += 'Delete succeed';
          }
          msg += 'Max Deep: \u001b[96m' + result.deep + '\u001b[39m. Time cost:' + ((Date.now() - time) / 1000) + 's';
          console.log(msg);
        }
        //process.stdin.end();
      });
    }
      process.stdin.end();
  }
})
