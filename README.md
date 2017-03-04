# fuckwinfsdel
No matter how deep the directory, It can be async's delete all.
![image](https://github.com/hezedu/SomethingBoring/blob/master/fuckwinfsdel.gif?raw=true)

For Windows developers. Aslo Can be used Linux, Mac.
###install
CLI(global):`npm install fuckwinfsdel -g`

or 

API(local)`npm install fuckwinfsdel`

##use(CLI)
`fuckwinfsdel youdir`

###example

`fuckwinfsdel node_modules`
Will delete current directory's node_modules folder.

`fuckwinfsdel D:\expressgit\node_modules`
Will delete D:\expressgit\node_modules folder.

##API
### fuckwinfsdel(dir, callback)
### fuckwinfsdel(dir, opts, callback)

###example
```js
var del = require('fuckwinfsdel');

del('./dist', function(err, result){
  if(err){
    return console.log(err);
  }
  console.log('end', result);
  /*
  result:
    errCount: error count 
    deep: files' deep
  */
});
```
opts:`process`,`onFail`.
###full state example
```js
//or 

del('./dist', {
    process : function(count1, count2){
      process.stdout.cursorTo(0);
      process.stdout.write('\u001b[93m' + count1 + '/' + count2 + '\u001b[39m');
    },
    onFail: function(method, err){
      console.error(method, err);
    }
  },
  function(err, result){

  });
```
