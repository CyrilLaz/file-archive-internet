const fs = require('fs');
const { resolve } = require('path');
const path = require('path');
const request = require('request');
// const rp = require('request-promise-any');

module.exports = (nameFile,server) => {
  return new Promise((resolve, reject) => {
    const fileToSend = path.join(path.resolve('./temp'), nameFile);
    // try {
    fs.createReadStream(fileToSend).pipe(
      request.post(server, (err, response, body) => {
        if (err) reject(err);
        return resolve(body);
        // console.log(response);
      })
    );
  });
};
