import { defineEndpoints, type DefineEndpoints } from "../src/define-endpoints";

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

console.log("Parsed endpoint urls:");
console.log(endpointA); // Output: /orders
console.log(endpointB); // Output: /orders/ord_1
console.log(endpointC); // Output: /payments/1/transaction/2
