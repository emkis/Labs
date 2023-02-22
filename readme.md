# Labs 🪴
Just a place to centralise draft ideas for libraries or abstractions of something I find interesting and may use later on (I probably don't).

<br>

## [Local Storage abstraction](./local-storage)
The idea is to have a safe and also type-safe abstraction to use the native `window.localStorage` Browser API.

### Motivation
- TypeScript considers the result of `JSON.parse` as `any`, so we don't have any type safety and need to remember to cast it.
- We don't know if what we want to get from Local Storage was changed manually or accidentally. If they changed and our application is not expecting and tries to parse it, we could have bugs.
- I think we should "hide" the keys and the values we store on Local Storage as they are public and people can try to use them to change behaviours in our application.
