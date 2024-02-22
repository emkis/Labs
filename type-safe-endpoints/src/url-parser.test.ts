import { it } from "node:test";
import assert from "node:assert/strict";
import { urlParser } from "./url-parser";

it('should return the same url when no values are provided', () => {
  assert.equal(urlParser("/orders", undefined), "/orders");
  assert.equal(urlParser("/settings/appearance", undefined), "/settings/appearance");
  assert.equal(urlParser("lorem-ipsum/sit", undefined), "lorem-ipsum/sit");
  assert.equal(urlParser("/pricing/business/", undefined), "/pricing/business/");
    
  assert.equal(urlParser("user", {}), "user");
  assert.equal(urlParser("/me", {}), "/me");
  assert.equal(urlParser("/products/promo/today/", {}), "/products/promo/today/");
  assert.equal(urlParser("fizz/buzz/", {}), "fizz/buzz/");
});

