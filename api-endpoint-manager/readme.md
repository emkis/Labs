# API Endpoint Manager

A simple solution for managing API endpoints in TypeScript, this allows you to quickly find in a predictable way how all APIs in your project are being used.

## Motivation

When working on large client projects that rely on multiple APIs, often is difficult to keep track of which APIs you use and what are the endpoints you depend on. Keeping track of this is important because it helps you to understand how a change in certain API/endpoint can affect the project, or to understand if a certain API/endpoint is being used at all.

Not knowing which API/endpoints your project relies on usually happens because endpoints are scattered across the project, the way we concatenate the strings to build the URL is always different, we might have different variable names for the same things and so on. This means that searching for a static URL path we need to find is not something simple to do.

To exemplify the issue, consider we have the `/api/v1/users/{userId}` endpoint, inside our project this endpoint could be being build in the following ways:

```ts
const userId = 1;
const path = `/api/v1/users/${userId}`;
// or
const id = 2;
const usersEndpoint = "/api/v1/users";
const path = `${usersEndpoint}/${id}`;
// or
const user = { id: 3 };
const path = `/api/v1/users/${user.id}`;
// or
const id = 4;
const apiVersion = "v1";
const path = "/api/" + apiVersion + "/users/" + id;
```

These above are just simple examples, but you can probably imagine how many other combinations we can have in a large project with multiple APIs and endpoints. To summarize we these problems:

- We don't have a consistent way of building URL paths.
- We don't have a simple way of finding all the usages of an endpoint.
- We don't necessarily know how many API/endpoints we rely on our project.

## Solution

My solution to this problem is just to create a simple abstraction that will ensure we solve all problems listed above, but without creating much complexity as at the end of the day we only want to have a string with the URL path.

**This is how we would use this solution:**

```ts
import { defineEndpoints, type DefineEndpoints } from "./api-endpoint-manager";

/**
 * Here we define all endpoints for the Payments API.
 * 
 * This ensures all endpoints are declared in a single place, and we know how
 * they will be used across the project.
 */
type PaymentsEndpoints = DefineEndpoints<{
  "/payments": undefined;
  "/payments/{id}": { id: string };
  "/payments/{p_id}/transaction/{tr_id}": { p_id: string; tr_id: string };
  "/orders": undefined;
  "/orders/{id}": { id: string };
}>;

/**
 * Here we create the parser for this API, which will be the only way we
 * build the URLs for each endpoint of this API.
 */
const parsePaymentsEndpoint = defineEndpoints<PaymentsEndpoints>();

/**
 * Here we use the parser to build the URLs for each endpoint.
 * 
 * Every time we need to build an URL for an endpoint of the Payments API,
 * we will use this parser and the endpoint arguments will be type checked 
 * and consistently built in the exact same way it was declared on the types.
 */
const endpointA = parsePaymentsEndpoint("/orders");
const endpointB = parsePaymentsEndpoint("/orders/{id}", { id: "ord_1" });
const endpointC = parsePaymentsEndpoint("/payments/{p_id}/transaction/{tr_id}", { p_id: "1", tr_id: "2" });

console.log("Parsed endpoint urls:");
console.log(endpointA); // Output: /orders
console.log(endpointB); // Output: /orders/ord_1
console.log(endpointC); // Output: /payments/1/transaction/2

```

With this solution above, we ensure that all the endpoints available for this Payments API for example are declared at a type level in a single place, which means that the string that represents each endpoint is always the same, this means we can easily search for the endpoint string and find all usages of it.

And, this also means that we can scan our code for the parser of that endpoint and we will also find all places that are actually using the respective API.