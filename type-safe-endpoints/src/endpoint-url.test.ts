import { it } from "node:test";
import assert from "node:assert/strict";
import { createEndpointUrlParser, type CreateEndpointObject } from "./endpoint-url";

type Endpoints = CreateEndpointObject<{
  "/payments": undefined;
  "/payments/{id}": {
    id: string;
  };
  "/payments/{id}/transaction/{tr_id}": {
    id: string;
    tr_id: string;
  };
  "https://forum.example.io/threads/{thread_id}": {
    thread_id: string;
  };
  "https://example.com/users/{user_id}/posts/{post_id}": {
    user_id: string;
    post_id: string;
  };
  "http://www.example.org/categories/{category_id}/products/{product_id}/reviews": {
    category_id: string;
    product_id: string;
  };
}>;

it("should return the parsed endpoint url", () => {
  const endpointUrl = createEndpointUrlParser<Endpoints>();
  assert.equal(endpointUrl("/payments"), "/payments");
  assert.equal(endpointUrl("/payments/{id}", { id: "49fh" }), "/payments/49fh");
  assert.equal(endpointUrl("/payments/{id}/transaction/{tr_id}", { id: "ifh-4fd", tr_id: "jh7-31d" }),
    "/payments/ifh-4fd/transaction/jh7-31d"
  );
  assert.equal(endpointUrl("https://forum.example.io/threads/{thread_id}", { thread_id: "jof-3fa" }),
    "https://forum.example.io/threads/jof-3fa"
  );
  assert.equal(endpointUrl("https://example.com/users/{user_id}/posts/{post_id}", { user_id: "usr_1", post_id: "pst_1" }),
    "https://example.com/users/usr_1/posts/pst_1"
  );
  assert.equal(endpointUrl("http://www.example.org/categories/{category_id}/products/{product_id}/reviews", { category_id: "cat_1", product_id: "prd_1" }),
    "http://www.example.org/categories/cat_1/products/prd_1/reviews"
  );
});
