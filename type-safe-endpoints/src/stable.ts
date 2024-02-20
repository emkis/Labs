/**
 * This file is the stable version of the `endpointUrl` function.
 *
 * But it currently depends on the `Endpoints` type to work which should be created beforehand,
 * I don't like this approach because it's not flexible enough, but it works for now
 */

import type { Endpoints } from "./endpoints";

/** Union type of all endpoint urls defined in the {@link Endpoints} type. */
type Endpoint = keyof Endpoints;

/** Returns the options of a specific endpoint url. */
type EndpointOptions<T extends Endpoint> = Endpoints[T];

/** Returns the parsed endpoint url with given options. */
export function endpointUrl<T extends Endpoint>(
  url: T,
  options?: EndpointOptions<T>
): string {
  let parsedUrl: string = url;

  for (const key in options) {
    // @ts-expect-error Endpoint options are required, the keys will always exist
    const value: string = options[key];
    parsedUrl = parsedUrl.replace(`{${key}}`, value);
  }

  return parsedUrl;
}

// Playground
// ----------

endpointUrl("/orders"); // shouldn't require 2 arg ✅

endpointUrl("/orders/{id}"); // should require the 2 arg ❌

endpointUrl("/orders/{id}", { id: "49fh" }); // should infer only id ✅

endpointUrl("/payments/{id}/transaction/{tr_id}", { foo: "bar" }); // should error as foo doesn't exist ✅
