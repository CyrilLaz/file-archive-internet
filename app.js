require('dotenv').config();
const fs = require('fs');
const path = require('path');
const appendToArhive = require('./controllers/appendToArhive');
const readAndSend = require('./controllers/readAndSend');

const { URL = 'https://www.dns-shop.ru', SERVER } = process.env;

// console.log(process.argv);
const SWITCH = Number(process.argv[2]);

const nameArchive = `archive.zip`;

switch (SWITCH) {
  case 0:
    appendToArhive(nameArchive, URL)
      .then((archive) => {
        console.log('#########');
        console.log('Архив готов к отправке');
        console.log(`Его размер ${archive.pointer()}`);
      })
      .catch((err) => console.log(err));
    break;

  case 1:
    readAndSend(nameArchive, SERVER)
      .then((body) => {
        const stats = fs.statSync(
          path.join(path.resolve('./temp'), nameArchive)
        );
        const fileSizeInBytes = stats.size;
        const res = JSON.parse(body);

        if (fileSizeInBytes === res.stats.size) {
          console.log('Файл успешно отправлен');
        } else {
          console.log('Что то пошло не так при отправке файла');
        }
      })
      .catch((err) => console.log(err));

    break;

  default:
    console.log('ВВедена не правильная команда');
    break;
}

// appendToArhive().then(() => archive.finalize());
