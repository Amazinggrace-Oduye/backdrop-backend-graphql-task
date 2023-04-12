import fs from "fs";
import path from "path";
import appRoot from "app-root-path";
import levenshtein from "js-levenshtein";

class UtilityServiceBase {
  fileOrDirectoryExists(fullPath: string) {
    try {
      fs.accessSync(fullPath, fs.constants.F_OK);
      return true;
    } catch (e) {
      return false;
    }
  }

  getFullPathFromRoot(_path: string) {
    const cwd = process.cwd();
    const rootFiles = [
      //
      "app-deploy-root.txt",
      "app-root-path.txt",
      "root-path.txt",
      "package.json",
    ];
    const anyExists = rootFiles.some((fileName) =>
      this.fileOrDirectoryExists(path.resolve(cwd, fileName))
    );
    if (anyExists) {
      return path.resolve(cwd, _path);
    }
    return path.resolve(appRoot.path, _path);
  }

  getLlevenshteinDistance(text1: string, text2: string) {
    return levenshtein(text1.toLowerCase(), text2.toLowerCase());
  }
}

export const UtilService = new UtilityServiceBase();
