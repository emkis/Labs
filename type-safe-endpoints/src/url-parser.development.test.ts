import { it } from "node:test";
import assert from "node:assert/strict";
import { urlParser, URLParserError } from "./url-parser.development";

it("should throw an error if url requires values but no values were provided", () => {
  assert.throws(() => urlParser("/payments/{id}", undefined), {
    name: URLParserError.name,
    message: `The values for "/payments/{id}" URL are required.`,
  });

  assert.throws(() => urlParser("/orders/{id}", {}), {
    name: URLParserError.name,
    message: `The values for "/orders/{id}" URL are required.`,
  });

  assert.throws(
    () => urlParser("/users/{user_name}/activate/{product_id}", {}),
    {
      name: URLParserError.name,
      message: `The values for "/users/{user_name}/activate/{product_id}" URL are required.`,
    }
  );
});

it("should throw an error when values are missing or partially provided", () => {
  assert.throws(() => urlParser("/orders/{id}", { fizz: "buzz", foo: "bar" }), {
    name: URLParserError.name,
    message: `The values for "/orders/{id}" URL are required, missing keys: id`,
  });

  assert.throws(
    () => urlParser("/account/{id}/enable/user/{id}", { idx: "abc" }),
    {
      name: URLParserError.name,
      message: `The values for "/account/{id}/enable/user/{id}" URL are required, missing keys: id`,
    }
  );

  assert.throws(
    () => urlParser("/products/{category_name}/{id}", { id: "jip-893" }),
    {
      name: URLParserError.name,
      message: `The values for "/products/{category_name}/{id}" URL are required, missing keys: category_name`,
    }
  );

  assert.throws(
    () =>
      urlParser("/user/{user_name}/settings/{section_name}", { lorem: "ipsum" }),
    {
      name: URLParserError.name,
      message: `The values for "/user/{user_name}/settings/{section_name}" URL are required, missing keys: user_name, section_name`,
    }
  );
});

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