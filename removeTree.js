var sas = require('sas');
var fs = require('fs');
var path = require('path');


function removeTree(dir) {

  var from = dir ; //根目录.
  //var from = __dirname + '/test'; //根目录.


  function _rmdir(fspath) {
    return function(cb) {
      fs.rmdir(fspath, function(err, result) {
        if (err) {
          console.log(err);
        }

        //console.log('111: '+fspath);
        cb(); //空文件夹
      })
    }
  }

  function read_dir(cb, t) {
    var t_fspath = t.fspath(); //t.fspath()=返回过滤掉t.path里数字的一个新数组。
    var fspath = t_fspath.join('') ? from + t_fspath.join('') : from;
    fs.readdir(fspath, function(err, files) {
      if (err) { //一些奇怪的文件夹
        console.error('read_dir Err', err);
        return cb("$STOP",err);
      }
      var obj = {};
      var len = files.length;
      //console.log(files);
      if (!len) {

        fs.rmdir(fspath, function(err, result) {
          if (err) {
            console.error(err);
          }

          //console.log('222: '+fspath);
          cb(); //空文件夹
        });
        //t.push(_rmdir(fspath));
      } else {


        for (var i = 0; i < len; i++) {
          var file = files[i];
          obj['/' + file] = fspath + '/' + file; //防止跟保留字冲突，前面加 '/';
        }
        t.push(obj); //添加任务
        t.push(_rmdir(fspath)); //添加任务
        //t.push(test_task);//添加任务
        //console.log(fspath);

        cb();
      }
    });
  }

  function _stat(path) { //iterator

    return function(cb) {
      fs.lstat(path, function(err, stat) {
        if (err) { //一些奇怪的文件
          console.error('_stat err');
          console.error(err);
          return cb();
        }
        if (stat.isSymbolicLink()) { //linux 软链接
          return cb();
        }
        if (stat.isDirectory()) {

          return cb('$RELOAD', [read_dir]);

        } else {

          fs.unlink(path, function(err, result) {
            if (err) {
              console.error(err);
            }
            cb();
          })

        }


      });
    }
  }

  console.log('正在删除...');
  var time = Date.now();
  sas([read_dir], {
    iterator: _stat,
    process:function(c1,c2){
      
      process.stdout.cursorTo(0)
      process.stdout.clearLine(1);
      process.stdout.write(c2+'/'+c1)
      //process.stdout.resume(c1+'/'+c2)
    },
    allEnd: function(err) {
      if(err){
        console.log('\n删除失败');
      }else{
        console.log('\n已删除.用时: ',Date.now() - time);
      }
      
    }
  });
}

//removeTree(__dirname + '/data/mkTree');

module.exports = removeTree;