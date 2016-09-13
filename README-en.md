# fuckwinfsdel
No matter how deep the directory, It can be async's delete all.

###install
CLI:`npm install fuckwinfsdel -g`

`npm install fuckwinfsdel`

##use(CLI)
`fuckwinfsdel youdir`

###example

`fuckwinfsdel node_modules`
Will delete current directory's node_modules folder.
Will delete node_modules folder.
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

//or 

del('./dist', {
    processLog : true // default false , if true, it will log tasks Number and error on process.
  },
  function(err, result){

  });
```

