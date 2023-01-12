const request = require('request');

async function getPage(url) {
 return request(url, function (err, res, body) {
    if (err) throw err;
    // console.log(body);
    return body// console.log(`${name} готов, пошли дальше`);
  });
}

module.exports = {getPage};
