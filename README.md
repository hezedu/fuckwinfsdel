# fuckwinfsdel
无论多深的目录都能删除。全异步操作，非常快。

[Switch to English README](README-en.md)
###安装
CLI: `npm install fuckwinfsdel -g`

`npm install fuckwinfsdel`

##使用(命令行)
`fuckwinfsdel youdir`

###例

`fuckwinfsdel node_modules`
将会删除当前目录下 node_modules 文件夹。

`fuckwinfsdel D:\expressgit\node_modules`

将会删除D:\expressgit\node_modules文件夹。

##API
### fuckwinfsdel(dir, callback)
### fuckwinfsdel(dir, opts, callback)

###例
```js
var del = require('fuckwinfsdel');

del('./dist', function(err, result){
  if(err){
    return console.log(err);
  }
  console.log('end', result);
  /*
  result:
    errCount: 错误数
    deep: files'深度
  */
});

//or

del('./dist', {
    processLog : true // default false , if true, it will log tasks Number and error on process.
  },
  function(err, result){

  });
```