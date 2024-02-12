import { endpointUrl } from "./endpoints";

const payments = endpointUrl("/payments");

const paymentUrl = endpointUrl("/payments/{id}", { id: "49fh" });

const accountUrl = endpointUrl("/account/{id}/profile/{profile_id}", {
  id: "ifh-4fd",
  profile_id: "jh7-31d",
});

console.info("Parsed endpoint urls:");
console.info(payments);
console.info(paymentUrl);
console.info(accountUrl);
