/**
 * In this file I'm trying to make the `endpointUrl` function to work with generic types.
 * This way we have a default way of declaring the endpoint types and this will work on demand.
 */

type EndpointUrl = string;
type EndpointOptions = Record<string, string> | undefined;
export type EndpointShape<
  T extends Record<EndpointUrl, EndpointOptions> = Record<
    EndpointUrl,
    EndpointOptions
  >
> = T;

declare type MyEndpoints = EndpointShape<{
  "/orders": undefined;
  "/orders/{id}": { id: string };
  "/foo/{bar}/fizz/{buzz}": { bar: string; buzz: string };
}>;

/** Returns the parsed endpoint url with given options. */
export function endpointUrl<T extends EndpointShape>(
  url: keyof T,
  options?: T[typeof url]
): string {
  // @ts-expect-error I don't know how to fix this
  let parsedUrl: string = url;

  for (const key in options) {
    const value: string = options[key];
    parsedUrl = parsedUrl.replace(`{${key}}`, value);
  }

  return parsedUrl;
}

// Playground
// ----------

endpointUrl("/user/{name}", { name: "John" }); // This should work by default with default types ✅

endpointUrl<MyEndpoints>("/orders"); // This should work by default with default types ✅

endpointUrl<MyEndpoints>("/orders/{id}"); // This should require the 2 arg ❌

endpointUrl<MyEndpoints>("/foo/{bar}/fizz/{buzz}", {}); // This one should only infer its own options, not all of them ❌
