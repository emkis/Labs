<div align="center">
  <h1>Clean `package.json`</h1>
  <p>This script removes all properties from your <code>package.json</code> you don't want to ship when publishing releases of your open source library.</p>

  <img src="./preview.gif" alt="">
  <br>
  <br>
</div>

## Usage
```bash
npx tsx ./script.ts
```

## Motivation
When you are publishing your package on NPM you need to upload as little files as possible, because everyone who installs your package will download everything you uploaded and usually we end up uploading a lot of thing we don't need.

There are a lot of thing we shouldn't upload like test files, as they are not going to be used by our end users and so on. But we can prevent sending other things too, why do we need to upload all of our `devDependencies`, `scripts` and other irrelevant properties from our `package.json`?

That's why I created this script, to clean every property from my `package.json` I don't want to ship to the users of my libraries.
