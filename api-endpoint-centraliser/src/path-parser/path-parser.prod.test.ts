import { it } from "node:test";
import assert from "node:assert/strict";
import { pathParser } from "./path-parser.prod";

it("should return the same path when no values are provided", () => {
  assert.equal(pathParser("/orders", undefined), "/orders");
  assert.equal(
    pathParser("/settings/appearance", undefined),
    "/settings/appearance"
  );
  assert.equal(pathParser("lorem-ipsum/sit", undefined), "lorem-ipsum/sit");
  assert.equal(
    pathParser("/pricing/business/", undefined),
    "/pricing/business/"
  );
  assert.equal(pathParser("https://emkis.dev", undefined), "https://emkis.dev");

  assert.equal(pathParser("user", {}), "user");
  assert.equal(pathParser("/me", {}), "/me");
  assert.equal(
    pathParser("/products/promo/today/", {}),
    "/products/promo/today/"
  );
  assert.equal(pathParser("fizz/buzz/", {}), "fizz/buzz/");
  assert.equal(
    pathParser("https://emkis.dev/articles", {}),
    "https://emkis.dev/articles"
  );
});

it("should replace the path values correctly", () => {
  assert.equal(pathParser("/orders/{id}", { id: "123" }), "/orders/123");
  assert.equal(
    pathParser("/settings/{section}", { section: "appearance" }),
    "/settings/appearance"
  );
  assert.equal(
    pathParser("/users/{user_name}", { user_name: "emkis" }),
    "/users/emkis"
  );
  assert.equal(
    pathParser("https://emkis.dev/articles/{article_slug}", {
      article_slug: "first-post",
    }),
    "https://emkis.dev/articles/first-post"
  );
  assert.equal(
    pathParser("/pricing/{plan}/", { plan: "business" }),
    "/pricing/business/"
  );
  assert.equal(
    pathParser("products/{productId}", { productId: "abc" }),
    "products/abc"
  );
  assert.equal(
    pathParser("products/{category}/{id}/", {
      category: "skincare",
      id: "okl-ifj-vab",
    }),
    "products/skincare/okl-ifj-vab/"
  );
  assert.equal(
    pathParser("/account/{id}/enable/user/{id}", { id: "p5e" }),
    "/account/p5e/enable/user/p5e"
  );
  assert.equal(
    pathParser("/items/{itemId}/details/{itemId}/edit/{itemId}", {
      itemId: "ui9",
    }),
    "/items/ui9/details/ui9/edit/ui9"
  );
});
