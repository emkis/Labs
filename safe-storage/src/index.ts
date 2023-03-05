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

// type GetItemOptions<T> = {
//   validate?: (value: unknown) => asserts value is T
// }

type GetItemOptions<T> = T extends unknown
  ? { validate?: (value: unknown) => asserts value is T }
  : { validate?: (value: unknown) => T };

function setItem<T>(key: string, options = {}) {
  return `${key}/dracula` as const
}

function getItem<T>(key: string, options: GetItemOptions<T> = {} as any): T {
  const data = JSON.parse(key)
  options.validate && options.validate(data)
  return data as T
}

function gettItem<T>(key: string, options: { 
  validate?: (value: unknown) => T
} = {}): T {
  const data = JSON.parse(key)
  options.validate && options.validate(data)
  return data as T
}


type Theme = { id: string }
type User = { name: string, age: number }

const Payment = z.object({
  id: z.string(),
  method: z.string(),
});

type Payment = z.infer<typeof Payment>;


function assertTheme(value: unknown): asserts value is Theme {
  if (typeof value !== 'object') {
    throw new Error('is not a theme')
  }
}

function assertUser(value: unknown): asserts value is User {
  if (typeof value !== 'object') {
    throw new Error('is not a theme')
  }
}


export const theme = getItem('theme', { validate: assertTheme })
export const user = getItem('user', { validate: assertUser })
export const unknown = getItem('unknown')
export const payment = getItem('payment', { validate: Payment.parse })

const a = getItem<object>('a')