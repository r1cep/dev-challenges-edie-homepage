import { promises as fs } from "fs";
import sharp from "sharp";

import path from "path";

const SERACH_EXT_LIST = [".jpg", ".jpeg", ".png"];

export const searchFiles = async (dirPath) => {
  const allDirents = await fs.readdir(dirPath, { withFileTypes: true });

  let files = [];
  for (const dirent of allDirents) {
    if (dirent.isDirectory()) {
      const newDirPath = path.join(dirPath, dirent.name);
      const newFiles = await searchFiles(newDirPath);
      files.push(...newFiles);
    }
    if (dirent.isFile() && SERACH_EXT_LIST.includes(path.extname(dirent.name))) {
      files.push({
        dirname: path.join(dirPath),
        fileName: dirent.name,
        ext: path.extname(dirent.name),
      });
    }
  }
  return files;
};

(async () => {
  const SERACH_TARGET_DIR = process.argv[2].replace(new RegExp("/$"), "");
  if (!SERACH_TARGET_DIR) throw new Error("dirname required");

  const imageFileInfos = await searchFiles(SERACH_TARGET_DIR);

  for (const { dirname: dirName, fileName, ext } of imageFileInfos) {
    const webpOption = {};
    switch (ext) {
      case ".jpeg":
      case ".jpg":
        webpOption.lossless = false;
        break;
      case ".png":
        webpOption.nearLossless = true;
        break;
    }

    await sharp(`./${dirName}/${fileName}`)
      .webp(webpOption)
      .toFile(`./${dirName}/${fileName.split(".")[0]}.webp`);

    // await fs.unlink(`./${dirName}/${fileName}`); //圧縮前の画像を削除したくない場合はコメントアウトする
  }
})();
