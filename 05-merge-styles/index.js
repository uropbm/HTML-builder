const fs = require('fs');
const path = require('path');
const folderPath = '05-merge-styles/styles/';

const writeStream = fs.createWriteStream('05-merge-styles/project-dist/bundle.css');

fs.readdir(folderPath, (err, files) => {
  if(err) {
    console.error(err);
    return;
  }

  files.forEach(el => {
    fs.stat(folderPath + el, (err) => {
      if (err) {
        console.error(err);
        return;
      }

      if (path.parse(el).ext == '.css') {
        const readStream = fs.createReadStream(folderPath + el, 'utf8');

        readStream.on('data', function(chunk) { 
          writeStream.write(`\n${chunk}`);
          // console.log(chunk);
        });
        // console.log(el);
      } 
    });
  });
  
});
