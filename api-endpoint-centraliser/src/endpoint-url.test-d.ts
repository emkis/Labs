import { it, assertType } from "vitest";
import { createEndpointUrlParser, type CreateEndpointObject } from "./endpoint-url";

type Endpoints = CreateEndpointObject<{
  "/payments": undefined;
  "/payments/{id}": { id: string };
  "/payments/{p_id}/transaction/{tr_id}": { p_id: string; tr_id: string };
  "/users": undefined;
  "/users/{user_name}": { user_name: string };
}>;

const endpointUrl = createEndpointUrlParser<Endpoints>();

it("should always return a string type", () => {
  assertType<string>(endpointUrl("/users"));
  assertType<string>(endpointUrl("/payments", undefined));
  assertType<string>(endpointUrl("/payments/{id}", { id: "3" }));
});

it("should not error when correct options of endpoint are provided", () => {
  endpointUrl("/payments");
  endpointUrl("/payments", undefined);
  endpointUrl("/payments/{id}", { id: "3" });
  endpointUrl("/users");
  endpointUrl("/users", undefined);
  endpointUrl("/users/{user_name}", { user_name: "emkis" });
  endpointUrl("/payments/{p_id}/transaction/{tr_id}", { p_id: "hjs", tr_id: "92z" });
});

it("should error when options of endpoint are invalid, missing or partially provided", () => {
  // @ts-expect-error
  endpointUrl("/payments", {});
  // @ts-expect-error
  endpointUrl("/payments", { name: 'nicolas' });
  // @ts-expect-error
  endpointUrl("/payments/{id}", {});
  // @ts-expect-error
  endpointUrl("/payments/{id}", { idx: '1' });
  // @ts-expect-error
  endpointUrl("/users/{user_name}", { user_name: 'emkis', extra_value: '0' });
  // @ts-expect-error
  endpointUrl("/payments/{p_id}/transaction/{tr_id}", { p_id: "hjs" });
});
