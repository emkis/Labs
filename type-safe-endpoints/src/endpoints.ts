export type Endpoints = {
  "/payments": undefined;
  "/payments/{id}": { id: string };
  "/payments/{id}/transaction/{tr_id}": { id: string; tr_id: string };
  "/orders": undefined;
  "/orders/{id}": { id: string };
};
