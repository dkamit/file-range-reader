# fs-range-reader
Javascript file utility to read particular range of file.

## Installation
```
npm i file-range-reader
```

## API
```js
var reader = require('file-range-reader');
```

### readRange(fileName, range, callback)

Reads a particular range of file where fileName is the name of file, range is the range passed to read.
Error will be thrown in following cases
  * File doesn't exist.
  * Range specified in invalid
  * Range specified is malformed

### sample usage
```js
reader.readRange("test/file.txt","bytes=5-9",function(err, buffer){
  if(err) console.log(err);
  console.log(buffer);
});
```

using in a web framework
```js
reader.readRange(req.query.fileName, req.query.range, function(err, buffer){
  if(err) console.log(err);
  console.log(buffer);
});
```

## License
[MIT](LICENSE)
