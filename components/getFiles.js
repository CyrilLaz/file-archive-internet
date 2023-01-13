const request = require('request');

async function getPage(url) {
 return new Promise((resolve, reject) => {
   request(url, function (err, res, body) {
    if (err) reject(err);
 
    return resolve(body)
  });
 }) 

}

module.exports = {getPage};
