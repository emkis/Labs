import { pathParser } from "./path-parser";

export type EndpointUrl = string;
export type EndpointValues = Record<string, string> | undefined;
export type EndpointObject = Record<EndpointUrl, EndpointValues>;
export type DefineEndpoints<T extends EndpointObject> = T;

export function defineEndpoints<T extends EndpointObject>() {
  return function endpointParser<Url extends keyof T>(
    ...args: T[Url] extends undefined ? [url: Url] : [url: Url, values: T[Url]]
  ): string {
    const [url, values] = args;
    return pathParser(url as string, values);
  };
}
