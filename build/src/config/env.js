"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.envConfig = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const dotenv_expand_1 = __importDefault(require("dotenv-expand"));
const myEnv = dotenv_1.default.config();
dotenv_expand_1.default.expand(myEnv);
const envGlobCache = {};
function getEnv(envKey) {
    if (envGlobCache[envKey] !== undefined) {
        return envGlobCache[envKey];
    }
    const newEnv = process.env[envKey];
    if (newEnv !== undefined) {
        envGlobCache[envKey] = newEnv;
        return newEnv;
    }
    return undefined;
}
function getEnvString(envKey) {
    const val = getEnv(envKey);
    if (val) {
        return val;
    }
    return "";
}
exports.envConfig = {
    ENV: getEnvString("NODE_ENV"),
    DATABASE_URL: getEnvString("DATABASE_URL"),
    DB_USERNAME: getEnvString("DB_USERNAME"),
    DB_PASSWORD: getEnvString("DB_PASSWORD"),
    DB_NAME: getEnvString("DB_NAME"),
    DB_PORT: getEnvString("DB_PORT"),
    PAYSTACK_BASE_URL: getEnvString("PAYSTACK_BASE_URL"),
    PAYSTACK_SECRET_KEY: getEnvString("PAYSTACK_SECRET_KEY"),
};
//# sourceMappingURL=env.js.map