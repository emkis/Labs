# Labs 🪴
Just a place to centralise draft ideas for libraries or abstractions of something I find interesting and may use later on (I probably don't).

<br>

## [Safe Storage abstraction](./storage)
The idea is to have a safe and also type-safe abstraction to use the native `window.localStorage` and `window.sessionStorage` browser APIs.

### Motivation
- TypeScript considers the result of `JSON.parse` as `any`, so we don't have any type safety and need to remember to cast the types.
- We don't know if what we want to get from Local or Session Storage was changed manually or accidentally. If the values changed and our application is not expecting, we could have bugs.
- I think we should "hide" the keys and the values we store on Local and Session Storage as they are public and people can try to use them to change behaviors in our application.

<br>

## [Environment](./environment/)
This script throws an error when finds environment variables that were not initialized on the `.env` files but are being used in your project.

### Motivation
I like to fail fast, we have no time to waist.

If a environment variable is not initialized and you're using it in your project, most likely it's because your forgot to initialize it. If that's the case, the application will probably initialize but it may have some weird behavior you are not expecting, and then you need to debug the application to understand what is going wrong. I simple want to prevent that possibility to ever happen.

This situation usually happens when:
- It's the first time people are setting up the project
- When you change a name of a variable on the `.env` file and don't update your code

<br>

## [Clean `package.json`](./clean-package-json/)
A script that removes all properties from your <code>package.json</code> you don't want to ship when publishing releases of your open source library.