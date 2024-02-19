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
