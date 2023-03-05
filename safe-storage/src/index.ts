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
 * Features:
 * - Prefixed storage (because is shared on domain)
 * - Multiple custom persisters
 * - If error uses the fallback
 * - Optional logger
 * - Test mode (don't serialize keys, log interactions)
 * - Throttle time
 * - Type-safe returns
 * - Parsable returns
 * 
 * Ideas:
 * - Way to get external data?
 */

interface Storage {
  getItem: (key: string) => string | null
  setItem: (key: string, value: string) => void
  removeItem: (key: string) => void
}

interface createStoragePersisterOptions {
  name: string
  storage: Storage
  fallbackStorage?: Storage
  testMode?: boolean
  throttleTime?: number
  serializeKey?: (key: string) => string;
  // serializeValue?: (value: unknown) => string;
  serializeValue?: typeof JSON.stringify;
  deserializeValue?: (value: string) => any;
  logger?: () => void
}

// Short hash algorithms
// FNV-1a
// node-murmurhash -- https://www.npmjs.com/package/murmurhash
// MurmurHash -- https://github.com/garycourt/murmurhash-js
// Nanoid -- https://github.com/ai/nanoid#readme
// https://www.npmjs.com/package/imurmurhash

interface GetItemOptions<T> {
  validate?: (data: unknown) => T
}

interface StoragePersister {
  // getItem: (key: string) => string | null
  getItem: <T>(key: string, options?: GetItemOptions<T>) => T
  
  setItem: (key: string, value: string) => () => void
  
  removeItem: (key: string) => void
}

const equal = <T>(value: T) => value

function createStoragePersister({
  serializeValue = JSON.stringify,
  deserializeValue = JSON.parse,
  serializeKey = equal,
  throttleTime = 1000,
  storage,
}: createStoragePersisterOptions): StoragePersister {

  function throttleMutation<Func extends () => void>(reader: Func) {
    throttleTime
    reader()
  }

  function getItem<T>(key: string, options: GetItemOptions<T> = {}): T | null {
    const { validate } = options

    const safeKey = serializeKey(key)
    const rawData = storage.getItem(safeKey)
    if (!rawData) return null
    const parsedData = deserializeValue(rawData)
    return validate ? validate(parsedData) : parsedData
  }

  function setItem(key: string, value: string): () => void {
    const safeKey = serializeKey(key)
    const serializedValue = serializeValue(value)
    storage.setItem(safeKey, serializedValue)
    return () => storage.removeItem(safeKey)
  }

  function removeItem(key: string): void {
    const safeKey = serializeKey(key)
    storage.removeItem(safeKey)
  }

  return {
    getItem,
    setItem,
    removeItem,
  } as StoragePersister
}

const localStoragePersister = createStoragePersister({
  name: 'my-app',
  storage: localStorage,
  serializeKey: equal,
  serializeValue: JSON.stringify,
  deserializeValue: JSON.parse,
  testMode: true,
})

const sessionStoragePersister = createStoragePersister({
  name: 'my-app',
  storage: sessionStorage,
  testMode: true,
})



type Theme = { id: string }
const transformTheme = (): Theme => ({ id: 'dark' })

// Setting items
localStoragePersister.setItem('theme', 'dracula')

const removeItem = localStoragePersister.setItem('theme', 'dracula')
removeItem()


// Getting
const unsafeTheme = localStoragePersister.getItem('theme')
const safeTheme = localStoragePersister.getItem('theme', { validate: transformTheme })


const Payment = z.object({
  id: z.string(),
  method: z.string(),
});

const one = localStoragePersister.getItem('one')
const two = localStoragePersister.getItem('two', { validate: transformTheme })
const three = localStoragePersister.getItem('three', { validate: Payment.parse })
const four = localStoragePersister.getItem('four', { validate: Payment.safeParse })

four.success ? four.data.method : null
