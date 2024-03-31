import { pathParser } from "../src/path-parser";

/**
 * When running this in development, it will trigger errors, but not in production.
 *
 * Run these to test out:
 * - pnpm start:parser
 * - pnpm start:parser:dev
 */

console.log(pathParser("/orders", undefined));
console.log(pathParser("/orders/{id}", { id: "ord_1" }));
console.log(pathParser("/pay/{p_id}/trans/{tr_id}", { p_id: "1", tr_id: "2" }));
console.log(pathParser("/users/{user_name}", {}));
