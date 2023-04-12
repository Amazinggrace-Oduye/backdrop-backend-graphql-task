"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UtilService = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const app_root_path_1 = __importDefault(require("app-root-path"));
const js_levenshtein_1 = __importDefault(require("js-levenshtein"));
class UtilityServiceBase {
    fileOrDirectoryExists(fullPath) {
        try {
            fs_1.default.accessSync(fullPath, fs_1.default.constants.F_OK);
            return true;
        }
        catch (e) {
            return false;
        }
    }
    getFullPathFromRoot(_path) {
        const cwd = process.cwd();
        const rootFiles = [
            "app-deploy-root.txt",
            "app-root-path.txt",
            "root-path.txt",
            "package.json",
        ];
        const anyExists = rootFiles.some((fileName) => this.fileOrDirectoryExists(path_1.default.resolve(cwd, fileName)));
        if (anyExists) {
            return path_1.default.resolve(cwd, _path);
        }
        return path_1.default.resolve(app_root_path_1.default.path, _path);
    }
    getLlevenshteinDistance(text1, text2) {
        return (0, js_levenshtein_1.default)(text1, text2);
    }
}
exports.UtilService = new UtilityServiceBase();
//# sourceMappingURL=util-services.js.map