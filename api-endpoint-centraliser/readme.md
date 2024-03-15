# API Endpoint Centraliser

A solution for centralising API endpoints in TypeScript, this allows you to quickly find how all APIs you have are being used inside your project in a predictable way.

## Motivation

When working on large client projects that rely on multiple APIs, often is difficult to keep track of which APIs you use and what are the endpoints you depend on or not. Keeping track of that is important because it helps to understand how a change in certain API/endpoint can affect the project, or to understand if a certain API/endpoint is being used at all.

This happens because usually endpoints are scattered across the project and the way we concatenate the strings is always different, it might have different variable names, it can be a computed strings, and so on. Which means that searching for the endpoint path doesn't guarantee we will find all usages as they might have been being concatenated with several different ways.

As a simple example, the `/api/v1/users/{userId}` endpoint could be being used in the following ways:

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

This above is a simple example, but you can probably imagine how many other combinations we can have in a real project with multiple APIs and endpoints.

## Solution

...
