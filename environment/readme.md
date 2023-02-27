# Environment
This script throw an error when finds environment variables (env) that were not initialized on the `.env` files but are being used in the project.

## Motivation
I want to fail fast, we have no time to waist.

If a environment variable is not initialized and I'm using it in my project, most likely it's because we forgot to initialize it. If that's the case, the application will probably initialize but it may have some weird behavior you are not expecting, and then you will need to debug the application until understand what is going wrong. I simple want to prevent that possibility to ever happen.

This situation usually happens when:
- It's the first time people are setting up the project
- When someone change a name of a variable on the `.env` file and forgot 

**Usage:**
```bash
pnpm tsx script
```

**Example:**
```json
"scripts": {
  "dev": "pnpm check-envs && start-your-app",
  "check-envs": "pnpm tsx ./scripts/check-envs.ts --root ."
},
```

## To Do's
- Fix RegEx to match end of the line correctly, currently I need to handle the ";", "," and spaces after

- Ignore "node_modules" folder