const fs = require('fs');
const path = require('path');
const folderPath = '03-files-in-folder/secret-folder/';

fs.readdir(folderPath, (err, files) => {
  if(err) {
    console.error(err);
    return;
  }

  files.forEach(el => {
    fs.stat(folderPath + el, (err, stats) => {
      if (err) {
        console.error(err);
        return;
      }

      if (stats.isFile()) {
        console.log(path.parse(el).name + ' - ' + path.parse(el).ext.replace(/./, '') + ' - ' + stats.size / 1000 + 'kb');
      } 
    });
  });
  
});
