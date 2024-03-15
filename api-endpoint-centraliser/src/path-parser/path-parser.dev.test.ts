import { it } from "node:test";
import assert from "node:assert/strict";
import { pathParser, PathParserError } from "./path-parser.dev";

it("should throw an error if path requires values but no values were provided", () => {
  assert.throws(() => pathParser("/payments/{id}", undefined), {
    name: PathParserError.name,
    message: `The values for "/payments/{id}" URL are required.`,
  });

  assert.throws(() => pathParser("/orders/{id}", {}), {
    name: PathParserError.name,
    message: `The values for "/orders/{id}" URL are required.`,
  });

  assert.throws(
    () => pathParser("/users/{user_name}/activate/{product_id}", {}),
    {
      name: PathParserError.name,
      message: `The values for "/users/{user_name}/activate/{product_id}" URL are required.`,
    }
  );
});

it("should throw an error when values are missing or partially provided", () => {
  assert.throws(
    () => pathParser("/orders/{id}", { fizz: "buzz", foo: "bar" }),
    {
      name: PathParserError.name,
      message: `The values for "/orders/{id}" URL are required, missing keys: id`,
    }
  );

  assert.throws(
    () => pathParser("/account/{id}/enable/user/{id}", { idx: "abc" }),
    {
      name: PathParserError.name,
      message: `The values for "/account/{id}/enable/user/{id}" URL are required, missing keys: id`,
    }
  );

  assert.throws(
    () => pathParser("/products/{category_name}/{id}", { id: "jip-893" }),
    {
      name: PathParserError.name,
      message: `The values for "/products/{category_name}/{id}" URL are required, missing keys: category_name`,
    }
  );

  assert.throws(
    () =>
      pathParser("/user/{user_name}/settings/{section_name}", {
        lorem: "ipsum",
      }),
    {
      name: PathParserError.name,
      message: `The values for "/user/{user_name}/settings/{section_name}" URL are required, missing keys: user_name, section_name`,
    }
  );
});

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
