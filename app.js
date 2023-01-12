require('dotenv').config();
const fs = require('fs');
const path = require('path');
const request = require('request');
const archive = require('./components/archivator');
const dayjs = require('dayjs');
const { getPage } = require('./components/getFiles');

const { URL = 'https://www.bezkoder.com/node-js-express-download-file/' } =
  process.env;

const nameArchive = `ymrf_${dayjs(new Date()).format('DD_MM_YYYY')}.zip`;

console.log(nameArchive);
async function downloadFiles() {
  const output = fs.createWriteStream(__dirname + '/temp/' + nameArchive);
  archive.pipe(output);
  console.log('Начали скачивание');
  for (let index = 1; index <= 14; index++) {
    const url = `${URL}/ymrf_${index}.html`;
    const name = `ymrf_${index}.html`;
    await getPage(url).then((page) => archive.append(page, { name }));
    // archive.append(getPage(url), { name });
    console.log(`${name} готов, пошли дальше`);
  }

  output.on('close', function () {
    console.log(archive.pointer() + ' total bytes');
    console.log(
      'archiver has been finalized and the output file descriptor has closed.'
    );
  });

  output.on('end', function () {
    console.log('Data has been drained');
  });
}

downloadFiles().then(() => archive.finalize());

// https://www.dns-shop.ru/
