/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly DEV: boolean
  readonly PROD: boolean
  readonly VITE_INTERNAL_API_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
