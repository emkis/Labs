type EndpointUrl = string;
type EndpointOptions = Record<string, string> | undefined;
type EndpointObject = Record<EndpointUrl, EndpointOptions>;

export type EndpointShape<T extends EndpointObject = EndpointObject> = T;

export function createEndpointParser<T extends EndpointObject>() {
  function endpointUrl<Url extends keyof T>(
    url: Url,
    options?: Url extends keyof T ? T[Url] : never
  ): string {
    return "";
  }

  return endpointUrl;
}

// Playground
// ----------

const defaultEndpointUrl = createEndpointParser();

defaultEndpointUrl("/users"); // Should work by default with no narrow types as generic ✅
defaultEndpointUrl("/users", undefined); // Should work by default with no narrow types as generic ✅
defaultEndpointUrl("/user/{name}", { name: "John" }); // Should work by default with no narrow types as generic ✅

declare type PaymentEndpoints = EndpointShape<{
  "/orders": undefined;
  "/orders/{id}": { id: string };
  "/payment/{p_id}/transaction/{t_id}": { p_id: string; t_id: string };
}>;

const paymentEndpointUrl = createEndpointParser<PaymentEndpoints>();

paymentEndpointUrl("/orders"); // Should work with narrow generic type and no 2nd arg ✅

paymentEndpointUrl("/orders/{id}"); // Should require the 2 arg ❌

paymentEndpointUrl("/payment/{p_id}/transaction/{t_id}", {}); // Should only infer its own options, not all of them ✅

paymentEndpointUrl("/payment/{p_id}/transaction/{t_id}", { id: "3" }); // Should not allow `id` ✅

// Playgro
paymentEndpointUrl("/payment/{p_id}/transaction/{t_id}", {});
