import { z } from 'zod'

// Refs
// https://github.com/localForage/localForage
// https://github.com/TanStack/query/blob/main/packages/query-sync-storage-persister/src/index.ts

/**
 * Packages:
 * 
 * - @storage/hash
 * - @storage/logger
 * - @storage/memory
 * 
 * Ideas:
 * - Fallback to memory?
 * - Custom config per set
 * - Way to get external data?
 */

interface Storage {
  getItem: (key: string) => string | null
  setItem: (key: string, value: string) => void
  removeItem: (key: string) => void
}

interface createStoragePersisterOptions {
  name: string
  testMode?: boolean
  throttleTime?: number

  serializeKey?: (key: string) => string;
  deserializeKey?: (key: string) => string;
  
  serializeValue?: (value: string) => string;
  deserializeValue?: (value: string) => string;

  retry?: (error: Error) => void
  logger?: () => void
}

// Short hash algorithms
// FNV-1a
// node-murmurhash -- https://www.npmjs.com/package/murmurhash
// MurmurHash -- https://github.com/garycourt/murmurhash-js
// Nanoid -- https://github.com/ai/nanoid#readme
// https://www.npmjs.com/package/imurmurhash


const storage = createStoragePersister({
  name: 'my-app',
  testMode: true,
})


// Setting items
storage.setItem('theme', 'dracula') // Key: my-app/theme

// Key: my-app/theme
storage.setItem('theme', 'dracula', options)

storage.setItem('theme', 'dracula', {
  validate: validateTheme,
})


// Getting
storage.getItem('theme') // Key: my-app/theme

// Key: my-app/theme
storage.getItem('theme', {
  validate: validateTheme,
})


type GetItemOptions<T> = {
  validate?: (data: unknown) => T
}

function setItem<T>(key: string, options = {}) {
  return `${key}/dracula` as const
}

function getItem<T>(key: string, options: GetItemOptions<T> = {}): T {
  const { validate } = options
  const data = JSON.parse(key)
  return validate ? validate(data) : data
}

type Theme = { id: string }
const transformTheme = (): Theme => ({ id: 'dark' })

const Payment = z.object({
  id: z.string(),
  method: z.string(),
});

const one = getItem('one')
const two = getItem('two', { validate: transformTheme })
const three = getItem('three', { validate: Payment.parse })
const four = getItem('four', { validate: Payment.safeParse })

four.success ? four.data.method : null
