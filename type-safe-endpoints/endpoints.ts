type Endpoints = {
  "/payments": undefined;
  "/payments/{id}": { id: string };
  "/orders": undefined;
  "/orders/{id}": { id: string };
  "/account/{id}/profile/{profile_id}": { id: string; profile_id: string };
};

/** Union type of all endpoint urls defined in the Endpoints type. */
type EndpointURL = { [K in keyof Endpoints]: K }[keyof Endpoints];

/** Gets the type options of a specific endpoint. */
type EndpointOptions<T extends EndpointURL> = Endpoints[T];

/** Returns the parsed endpoint url with the given options. */
export function endpointUrl<T extends EndpointURL>(
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
