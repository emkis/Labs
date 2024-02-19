/**
 * Example of all endpoints available in this fake API.
 * This can be a merged type of multiple other APIs or just a single API.
 */
export type Endpoints = {
  "/payments": undefined;
  "/payments/{id}": { id: string };
  "/payments/{id}/transaction/{tr_id}": { id: string; tr_id: string };
  "/orders": undefined;
  "/orders/{id}": { id: string };
};
