import { throttle } from './throttle';

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

interface CreateStoragePersisterOptions {
  storage: Storage
  fallbackStorage?: Storage
  testMode?: boolean
  throttleTime?: number
  serializeKey?: (key: string) => string;
  serializeValue?: (value: unknown) => string;
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
  parse?: (data: unknown) => T
}

interface StoragePersister {
  getItem: <T>(key: string, options?: GetItemOptions<T>) => T | null
  setItem: <T>(key: string, value: T) => void
  removeItem: (key: string) => void
}

function equal<T>(value: T): T {
  return value
}

export function createStoragePersister({
  serializeKey = equal,
  serializeValue = JSON.stringify,
  deserializeValue = JSON.parse,
  throttleTime = 1000,
  storage: primaryStorage,
  fallbackStorage,
  logger,
  testMode = false,
}: CreateStoragePersisterOptions): StoragePersister {
  let isFallbackStorageEnabled = false

  function getStorage() {
    if (!fallbackStorage) return primaryStorage
    return isFallbackStorageEnabled ? fallbackStorage : primaryStorage
  }

  function persist(serializedKey: string, serializedValue: string): void {
    try {
      const storage = getStorage()
      storage.setItem(serializedKey, serializedValue)
    } catch (error) {
      if (!fallbackStorage) throw error
      isFallbackStorageEnabled = true
      fallbackStorage.setItem(serializedKey, serializedValue)
    }
  }

  function getItem<T>(key: string, { parse }: GetItemOptions<T> = {}): T | null {
    const storage = getStorage()
    const serializedKey = serializeKey(key)
    const rawData = storage.getItem(serializedKey)
    if (!rawData) return null
    const deserializedData = deserializeValue(rawData)
    return parse ? parse(deserializedData) : deserializedData
  }

  function setItem<T>(key: string, value: T): void {
    const serializedKey = serializeKey(key)
    const serializedValue = serializeValue(value)
    persist(serializedKey, serializedValue)
  }

  function removeItem(key: string): void {
    const storage = getStorage()
    const serializedKey = serializeKey(key)
    storage.removeItem(serializedKey)
  }

  return {
    getItem,
    setItem : throttle(setItem, throttleTime),
    removeItem: throttle(removeItem, throttleTime),
  }
}
