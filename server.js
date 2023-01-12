const express = require('express');
const fs = require('fs');
const dayjs = require('dayjs');
const app = express();


app.post('/upload',(req,res)=>{
   req.pipe(fs.createWriteStream(`./ymrf_${dayjs(new Date).format('DD_MM_YYYY')}.zip`));
//    throw new Error();
res.send({message:"Файл получен"});
    console.log('req запрос пришел с файлом');
    // console.log(req);
});
  

app.listen(3000,()=>{console.log('Запущен сервер на порте 3000');})