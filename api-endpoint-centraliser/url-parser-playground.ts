import { urlParser } from "./src/url-parser";

/**
 * When running this in development, it will trigger errors, but not in production.
 *
 * Run these to test out:
 * - pnpm start:parser
 * - pnpm start:parser:dev
 */

console.log(urlParser("/orders", undefined));
console.log(urlParser("/orders/{id}", { id: "ord_1" }));
console.log(urlParser("/pay/{p_id}/trans/{tr_id}", { p_id: "1", tr_id: "2" }));
console.log(urlParser("/users/{user_name}", {}));
