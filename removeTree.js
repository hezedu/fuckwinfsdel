var sas = require('sas');
var fs = require('fs');
var path = require('path');

function processLog(c1, c2) {
  process.stdout.cursorTo(0);
  process.stdout.write('\u001b[93m' + c2 + '/' + c1 + '\u001b[39m');
}

function removeTree(dir, opts, callback) {
  dir = path.resolve(dir); //根目录.
  var deep = 0; //深度计数
  var errCount = 0; //未能删除文件数
  if(typeof opts === 'function') {
    callback = opts;
    opts = {};
  }else{
    callback = callback || function(){}
  }

  var sasProcessLog = null;
if(opts.process){
    sasProcessLog = opts.process
  }else if(opts.processLog){
    sasProcessLog = processLog
  }

  function _errHandle(name, err){
    console.error(name, err.name, err.message);
    errCount = errCount + 1;
  }
  function _rmdir(fspath) {
    return function(cb) {
      fs.rmdir(fspath, function(err, result) {
        if (err) {
          _errHandle('rmdir', err);
        }
        cb();
      })
    }
  }

  function read_dir(cb, t) {
    var t_fspath = t.fspath(); //t.fspath()=返回过滤掉t.path里数字的一个新数组。
    var fspath = t_fspath.join('') ? dir + t_fspath.join('') : dir;
    if (t_fspath.length > deep) {
      deep = t_fspath.length; //记录最深点
    }
    fs.readdir(fspath, function(err, files) {
      if (err) { //一些奇怪的文件夹
        _errHandle('readdir', err);
        return cb("$STOP", err);
      }
      var len = files.length;
      if (len) {
        var obj = {};
        for (var i = 0; i < len; i++) {
          var file = files[i];
          obj['/' + file] = fspath + '/' + file; //防止跟保留字冲突，前面加 '/';
        }
        t.push(obj); //添加任务
      }
      t.push(_rmdir(fspath)); //添加任务
      cb();
    });
  }

  function _stat(fspath) { //iterator
    return function(cb) {
      fs.lstat(fspath, function(err, stat) {
        if (err) { //一些奇怪的文件
          _errHandle('lstat', err);
          return cb();
        }
/*        if (stat.isSymbolicLink()) { //链接
          return cb();
        }*/
        if (stat.isDirectory()) {
          return cb('$RELOAD', [read_dir]);
        } else {
          fs.unlink(fspath, function(err, result) {
            if (err) {
              _errHandle('unlink', err);
            }
            cb();
          });
        }
      });
    }
  }
  console.log('正在删除...');
  var time = Date.now();
  sas(dir, {
    iterator: _stat,
    process: sasProcessLog,
    allEnd: function(err) {
      if (err) {
        return callback(err);
      } else {
        callback(null, {
          errCount: errCount,
          deep:deep,
          timeCount: (Date.now() - time)
        });
      }
    }
  });
}

//test
// removeTree('D:/duwei/git/sas/demo/data/mkTree', {processLog: true}, function(err, result) {
//   if (err) {
//     console.error('\n删除失败');
//   } else {
//     var msg = '\n';
//     var errCount = result.errCount;
//     if(errCount){
//       msg += '结束, 共有\u001b[91m' + errCount + '\u001b[39m个文件删除失败,请关闭其它可能占用该文件夹的程序再试.\n';
//     }else{
//       msg += '删除成功。';
//     }
//     msg += '最深达 \u001b[96m' + result.deep + '\u001b[39m 层.用时:' + result.timeCount + 'ms';
//     console.log(msg);
//   }
//   //process.stdin.end();
// });
module.exports = removeTree;