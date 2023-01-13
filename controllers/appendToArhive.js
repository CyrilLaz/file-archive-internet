const archive = require('../components/archivator');
const fs = require('fs');
const { resolve, join } = require('path');
const { getPage } = require('../components/getFiles');
const dir = './temp';

async function appendToArhive(nameArchive, URL) {
  if (!fs.existsSync(dir)) {
    // проверка наличия папки архива
    fs.mkdirSync(dir);
  }
  const output = fs.createWriteStream(join(resolve('./temp'), nameArchive)); //path.join(path.resolve('./temp'), files[0])
  let count=0;
  archive.pipe(output);
  console.log('Начали скачивание');
  for (let index = 1; index <= 14; index++) {
    const name = `ymrf_${index}.html`;
    const url = `${URL}/${name}`;
    if(count>3){
     // иначе есть опастность словить петлю
      return Promise.reject('Прерываем скачивание иначе долго и зациклились, попробуй скачать еще раз');
    } 
    await getPage(url)
      .then((page) => archive.append(page, { name }))
      .catch((err) => {
        index=index-1;
        count++;
        console.log('Попробуем скачать еще раз, а то ошибка');
      });


    console.log(`${name} готов, пошли дальше`);
  }

  await archive.finalize();

  return archive;
}

module.exports = appendToArhive;
