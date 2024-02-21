export type EndpointUrl = string;
export type EndpointOptions = Record<string, string> | undefined;
export type EndpointObject = Record<EndpointUrl, EndpointOptions>;
export type CreateEndpointObject<T extends EndpointObject> = T;

export function createEndpointUrlParser<T extends EndpointObject>() {
  return function endpointUrlParser<Url extends keyof T>(
    url: Url,
    options?: T[Url]
  ): string {
    return "";
  };
}
