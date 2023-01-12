const fs = require('fs');
const path = require('path');
const request = require('request');

fs.readdir(path.resolve('./temp'), (err, files) => {
  if (err || !files) {
    return console.log('При чтении папки temp произошла ошибка');
  }
  const fileToSend = path.join(path.resolve('./temp'), files[0]);
  try {
    fs
          .createReadStream(fileToSend)
          .pipe(request.put('http://localhost:3000/'));

  } catch (err) {
    console.log('jib,rf');
  }
});
// fs.createReadStream('file.json').pipe(
// request.put('http://mysite.com/obj.json')
// );
