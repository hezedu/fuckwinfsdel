#!/usr/bin/env node

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
      
      console.log('正在删除...');
      var time = Date.now();
      removeTree(param, {processLog: true}, function(err, result) {
        if (err) {
          console.error('\n删除失败');
        } else {
          var msg = '\n';
          var errCount = result.errCount;
          if(errCount){
            msg += '结束, 共有\u001b[91m' + errCount + '\u001b[39m个文件删除失败,请关闭其它可能占用该文件夹的程序再试.\n';
          }else{
            msg += '删除成功。';
          }
          msg += '最深达 \u001b[96m' + result.deep + '\u001b[39m 层.用时:' + (Date.now() - time) + 'ms';
          console.log(msg);
        }
        //process.stdin.end();
      });
    }
      process.stdin.end();
  }
})