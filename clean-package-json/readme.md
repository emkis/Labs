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
When you are publishing your package on NPM you need to upload as few files as possible because everyone who installs your package will need to download everything you uploaded to NPM. The larger your package is the more time it will take to download it, and your library will not only be downloaded by users, but they also will need to download it a ton of times on CI actions, so I guess by now it's clear on how easily this things scale.

There are a lot of things we shouldn't upload to NPM like test files, local configuration files, and so on. But we could also save some KBs by preventing uploading some other things, like the `devDependencies`, `scripts` and other irrelevant properties from our `package.json`, these things are only used for development and our end user doesn't need to have that.

That's why I created this script. It cleans all properties from my `package.json` I don't want to ship to users of my libraries. You can easily customize the script for your project too.
