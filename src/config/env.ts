import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";

const myEnv = dotenv.config();
dotenvExpand.expand(myEnv);

const envGlobCache: { [x: string]: string } = {};
type IEnvironment = "production" | "staging" | "development" | "test";
function getEnv(envKey: string) {
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

function getEnvString(envKey: string) {
  const val = getEnv(envKey);
  if (val) {
    return val;
  }
  return "";
}

export const envConfig = {
  ENV: getEnvString("NODE_ENV") as IEnvironment,
  DATABASE_URL: getEnvString("DATABASE_URL"),
  DB_USERNAME: getEnvString("DB_USERNAME"),
  DB_PASSWORD: getEnvString("DB_PASSWORD"),
  DB_NAME: getEnvString("DB_NAME"),
  DB_PORT: getEnvString("DB_PORT"),
  PAYSTACK_BASE_URL: getEnvString("PAYSTACK_BASE_URL"),
  PAYSTACK_SECRET_KEY: getEnvString("PAYSTACK_SECRET_KEY"),
};
