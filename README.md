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

###例
```js
var del = require('fuckwinfsdel');

del('./dist', function(){
  console.log('end', arguments);
});
```