import { it, assertType } from "vitest";
import { defineEndpoints, type DefineEndpoints } from "./endpoint-url";

type Endpoints = DefineEndpoints<{
  "/payments": undefined;
  "/payments/{id}": { id: string };
  "/payments/{p_id}/transaction/{tr_id}": { p_id: string; tr_id: string };
  "/users": undefined;
  "/users/{user_name}": { user_name: string };
}>;

const parseEndpoint = defineEndpoints<Endpoints>();

it("should always return a string type", () => {
  assertType<string>(parseEndpoint("/users"));
  assertType<string>(parseEndpoint("/payments/{id}", { id: "3" }));
});

it("should not error when correct options of endpoint are provided", () => {
  parseEndpoint("/payments");
  parseEndpoint("/payments/{id}", { id: "3" });
  parseEndpoint("/users");
  parseEndpoint("/users/{user_name}", { user_name: "emkis" });
  parseEndpoint("/payments/{p_id}/transaction/{tr_id}", { p_id: "hjs", tr_id: "92z" });
});

it("should error when options of endpoint are invalid, missing or partially provided", () => {
  // @ts-expect-error
  parseEndpoint("/payments", undefined);
  // @ts-expect-error
  parseEndpoint("/payments", {});
  // @ts-expect-error
  parseEndpoint("/payments", { name: "nicolas" });
  // @ts-expect-error
  parseEndpoint("/payments/{id}", {});
  // @ts-expect-error
  parseEndpoint("/payments/{id}", { idx: "1" });
  // @ts-expect-error
  parseEndpoint("/users/{user_name}", { user_name: "emkis", extra_value: "0" });
  // @ts-expect-error
  parseEndpoint("/payments/{p_id}/transaction/{tr_id}", { p_id: "hjs" });
});
