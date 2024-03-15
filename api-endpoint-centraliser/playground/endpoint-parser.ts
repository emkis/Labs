import { defineEndpoints, type DefineEndpoints } from "../src/endpoint-url";

type PaymentsEndpoints = DefineEndpoints<{
  "/payments": undefined;
  "/payments/{id}": { id: string };
  "/payments/{p_id}/transaction/{tr_id}": { p_id: string; tr_id: string };
  "/orders": undefined;
  "/orders/{id}": { id: string };
}>;

const parsePaymentsEndpoint = defineEndpoints<PaymentsEndpoints>();

const endpointA = parsePaymentsEndpoint("/orders");
const endpointB = parsePaymentsEndpoint("/orders/{id}", { id: "ord_1" });
const endpointC = parsePaymentsEndpoint("/payments/{p_id}/transaction/{tr_id}", { p_id: "1", tr_id: "2" });

console.info("Parsed endpoint urls:");
console.info(endpointA);
console.info(endpointB);
console.info(endpointC);
