require('dotenv').config();
const fs = require('fs');
const path = require('path');
const appendToArhive = require('./controllers/appendToArhive');
const readAndSend = require('./controllers/readAndSend');

const { URL = 'https://example.com', SERVER = 'http://localhost:3032/upload' } = process.env;

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
      .then((res) => {
        const pathToArchive = path.join(path.resolve('./temp'), nameArchive);
        const stats = fs.statSync(
          pathToArchive
        );
        const fileSizeInBytes = stats.size;

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

