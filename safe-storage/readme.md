# Safe [Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API)

The idea is to have a type-safe and runtime-safe abstraction to use the native `window.localStorage` and `window.sessionStorage` browser APIs.


### Motivation
- When we store any kind of data on the user's device, we are not the owners of that data anymore, this means that we can't just trust that that data is reliable, we need to double-check the stored values before using it again. Maybe the user changed the stored values in Local/Session Storage with bad intentions or maybe an extension changed it by accident, so then if we just try to use this data without ensuring that is valid, our application might break or behave in a way we were not expecting.
- I think we should "mask" the keys and the values we store on Local/Session Storage as they are public and someone could potentially read and modify them to try to have some kind of control over our application's behaviour.
- Some browsers can block the use of Local/Session Storage for security reasons or we might have reached the limit of data that could be stored on the user's browser. In both situations, the browser would not allow setting in Local/Session Storage, so an error would be thrown and our application would probably break. Ideally, we should have a fallback system that will store all data in memory in these cases of error to at least prevent the app from breaking and disrupting the user experience while using our application.
