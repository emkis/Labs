import {
  createEndpointUrlParser,
  type CreateEndpointObject,
} from "../src/endpoint-url";

type PaymentEndpoints = CreateEndpointObject<{
  "/payments": undefined;
  "/payments/{id}": { id: string };
  "/payments/{p_id}/transaction/{tr_id}": { p_id: string; tr_id: string };
  "/orders": undefined;
  "/orders/{id}": { id: string };
}>;

const paymentEndpointUrl = createEndpointUrlParser<PaymentEndpoints>();

const resultA = paymentEndpointUrl("/orders");

const resultB = paymentEndpointUrl("/orders/{id}", { id: "ord_1" });

const resultC = paymentEndpointUrl("/payments/{p_id}/transaction/{tr_id}", {
  p_id: "1",
  tr_id: "2",
});

console.info("Parsed endpoint urls:");
console.info(resultA);
console.info(resultB);
console.info(resultC);
