# Safe [Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API)

The idea is to have a safe and also type-safe abstraction to use the native `window.localStorage` and `window.sessionStorage` browser APIs.

### Motivation
- TypeScript considers the result of `JSON.parse` as `any`, so we don't have any type safety and need to remember to cast the types.
- We don't know if what we want to get from Local or Session Storage was changed manually or accidentally. If the values changed and our application is not expecting, we could have bugs.
- I think we should "hide" the keys and the values we store on Local and Session Storage as they are public and people can try to use them to change behaviors in our application.