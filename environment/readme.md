# Environment
This script throw an error when finds environment variables that were not initialized on the `.env` files but are being used in the project.

## Motivation
I like to fail fast, we have no time to waist.

If a environment variable is not initialized and you're using it in your project, most likely it's because your forgot to initialize it. If that's the case, the application will probably initialize but it may have some weird behavior you are not expecting, and then you need to debug the application to understand what is going wrong. I simple want to prevent that possibility to ever happen.

This situation usually happens when:
- It's the first time people are setting up the project
- When you change a name of a variable on the `.env` file and don't update your code

## Usage
```bash
pnpm tsx script --root your-project-path
```

## In your `package.json`
```json
"scripts": {
  "dev": "pnpm check-envs && start-your-app",
  "check-envs": "pnpm tsx ./scripts/check-envs.ts --root ."
},
```

## Script options
```
-d, --directories <paths>  directories you want to check for env values (default: "src, app")
-e, --extensions <types>   file extensions you support (default: ".ts, .tsx, .js, .jsx")
-i, --ignore <envs>        env values to ignore (default: "DEV, PROD, NODE_ENV")
-r, --root <path>          root path where you have your env files
-h, --help                 display help for command
```

## Important defaults
By default the script will only look for `process.env.` and `import.meta.env.`.
To get the initialized environment values, the script searches in the `.env`, `.env.local` and `.env.development` files.

If you need different behaviors, just change the script.