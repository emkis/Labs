import { endpointUrl } from "./src/endpoint-url";

const payments = endpointUrl("/payments");

const paymentUrl = endpointUrl("/payments/{id}", { id: "49fh" });

const paymentTransaction = endpointUrl("/payments/{id}/transaction/{tr_id}", {
  id: "ifh-4fd",
  tr_id: "jh7-31d",
});

console.info("Parsed endpoint urls:");
console.info(payments);
console.info(paymentUrl);
console.info(paymentTransaction);
