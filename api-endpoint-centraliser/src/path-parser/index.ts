import * as prodModule from "./path-parser.prod";
import * as devModule from "./path-parser.dev";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production";
    }
  }
}

export const pathParser: typeof prodModule.pathParser =
  process.env.NODE_ENV !== "development"
    ? prodModule.pathParser
    : devModule.pathParser;
