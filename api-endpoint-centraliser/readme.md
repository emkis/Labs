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

My solution to this problem is to declare in a centralised place all the endpoints a specific API has, and then use
...
