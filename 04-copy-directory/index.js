const FSP = require('fs').promises;
const fs = require('fs');
const path = require('path');
const copyFolder = '04-copy-directory/files';
const newFolder = '04-copy-directory/files-copy';

async function copyDir(src, dest) {

  const entries = await FSP.readdir(src, {withFileTypes:true});

  await FSP.mkdir(dest);

  for (let entry of entries) {

    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      await copyDir(srcPath, destPath);
    } else {
      await FSP.copyFile(srcPath, destPath);
    }
  }
}

fs.stat((newFolder), async (err) => {
  if (!err) {
    await FSP.rm(newFolder, {recursive: true});
    copyDir(copyFolder, newFolder);
  } else copyDir(copyFolder, newFolder);
});