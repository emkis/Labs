import * as prodModule from "./url-parser.prod";
import * as devModule from "./url-parser.dev";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production";
    }
  }
}

export const urlParser: typeof prodModule.urlParser =
  process.env.NODE_ENV !== "development"
    ? prodModule.urlParser
    : devModule.urlParser;
