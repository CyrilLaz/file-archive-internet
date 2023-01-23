const fs = require('fs');
const { resolve } = require('path');
const path = require('path');
const request = require('request');

module.exports = (nameFile, server) => {
  return new Promise((resolve, reject) => {
    const fileToSend = path.join(path.resolve('./temp'), nameFile);
    // try {
    fs.createReadStream(fileToSend).pipe(
      request.post(server, (err, response, body) => {
        if (err) reject(err);

        if (response.statusCode === 404)
          reject('Что пошло не так, проверь адрес');
        resolve(JSON.parse(body));
      })
    );
  });
};
