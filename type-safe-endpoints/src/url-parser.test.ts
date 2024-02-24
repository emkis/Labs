import { it } from "node:test";
import assert from "node:assert/strict";
import { urlParser } from "./url-parser";

it('should return the same url when no values are provided', () => {
  assert.equal(urlParser("/orders", undefined), "/orders");
  assert.equal(urlParser("/settings/appearance", undefined), "/settings/appearance");
  assert.equal(urlParser("lorem-ipsum/sit", undefined), "lorem-ipsum/sit");
  assert.equal(urlParser("/pricing/business/", undefined), "/pricing/business/");
  assert.equal(urlParser("https://emkis.dev", undefined), "https://emkis.dev");
  
  assert.equal(urlParser("user", {}), "user");
  assert.equal(urlParser("/me", {}), "/me");
  assert.equal(urlParser("/products/promo/today/", {}), "/products/promo/today/");
  assert.equal(urlParser("fizz/buzz/", {}), "fizz/buzz/");
  assert.equal(urlParser("https://emkis.dev/articles", {}), "https://emkis.dev/articles");
});

it('should replace the url options with the provided values', () => {
  assert.equal(urlParser("/orders/{id}", { id: "123" }), "/orders/123");
  assert.equal(urlParser("/settings/{section}", { section: "appearance" }), "/settings/appearance");
  assert.equal(urlParser("/users/{user_name}", { user_name: "emkis" }), "/users/emkis");
  assert.equal(urlParser("https://emkis.dev/articles/{article_slug}", { article_slug: 'first-post' }), "https://emkis.dev/articles/first-post");
  assert.equal(urlParser("/pricing/{plan}/", { plan: "business" }), "/pricing/business/");
  assert.equal(urlParser("products/{productId}", { productId: "abc" }), "products/abc");
  assert.equal(urlParser("products/{category}/{id}/", { category: "skincare", id: "okl-ifj-vab" }), "products/skincare/okl-ifj-vab/");
  assert.equal(urlParser("/account/{id}/enable/user/{id}", { id: "p5e" }), "/account/p5e/enable/user/p5e");
  assert.equal(urlParser("/items/{itemId}/details/{itemId}/edit/{itemId}", { itemId: "ui9" }), "/items/ui9/details/ui9/edit/ui9");
});

