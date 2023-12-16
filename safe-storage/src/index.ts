import { throttle } from './throttle';

// ts-storage-persister
// 404B (gzip)
// https://bundlejs.com/?share=GYVwdgxgLglg9mABFAFgJzlKAbApgHgBUBBNAcwGdFcAPKXMAEyvAGsw4B3MAbQF0AfAAoAUIkShIALkRCAdAoCG5CjJIqAlIgC8AxGw7cANGMSdFMKDLAgAtgCNcaE1oDepvFGQxbTmQCVcKBA0MEIATwAHAigo3DhgRAogwh94kCg9AB9EG2xsHVyQfI8gxEjlRVtVRHVKUzQgkKRJaHgkeSUVNVJKN1NxCrQqqm1EZXrxcRhEoVhfNB1tMbzsfqmp+adC5KhU3zgMoSEtXUR3DY3WzrkhkY0By63FleLsR-EAXyMzCygHjafUxAoEiGBgehoYCKCC4RAAZSgcGGZDhF0QqKgAEl6LYZEJWLhwjIKFA0OCyKc9KTyWAyIgcqtTLscbg8bJCcSkmSKT8AG6KbAgXAknl0qmIPlwGCMBpsuB83Cs9kEomi2mUnR6KUykSg8GQ6GwxAAYUainoiORilRAAUnBQYKSnAB5SKwBBUdGk62omRWlG4UzQ-L2GGsAM23AAfn9SMDpnopIAsnBGDGZPY4HA8IowIn0JgcLh9hmig4nMynDBBTAAF64ADSRNjHLV3I1EppFIA3FXybWGwA1QXC1tCAVCkX6MDsLhgLtish98Tp5ID7D13AjqfjyfC9UUiV58IrxDYOBkVFoccSnWy-UQpxGuEAcSCyrdHrAFCIenRQzJOOjAWooMgGPOEqEHqIhgk+UIwnCkZ2g6TqQucpiYsqMh-qqXLdnSPxwO67QUK277YriX6kX+UEMkUJTiCyuI4YQwicoehGSqO06EHe0qyuIjS2AqSosW2+FLvxuqgq037UAAjiAgq4fuvEaGoGFCU0oTcVOMEiLQkTIl4cntIgEDmpa8ZRvaaCOs6aBCN61aDk2RKFLgSmCiYTGuZuw48YUABS8IugAcnIBFkDM4S+Yga7+VuO7CiFYWRYBuDxagGBYHgpaFAAjAADKV8U+oGMiROStjKOEyFZcGgrYGGEARjZqLxReV5ONluApmmcJjCGyQmJ8MhmrgFq4A1dkOZC1GehpCIdbgc1ods6KeIgToAGLNa17W+rgACiYCKPYeCMIUI1BsG4BtAgGJBA1JxaVMMyyAAhCGLXhg1WiNMEunVT4dUNY8QPNDtFD7aG-2rWdF1XYg0YSAdCPHYgVU1eDq3ArB4hmU90T2WhQjrjWAW4IwzaSRqPyU25jApdO0XLfe73iGS4Rc1MECel4FVRoUmKvQClzC6iUUfriFNJQ2tNEozCs06zEtfBZFoQCgshOBgaDrJcn1CD9GNtQDyCFpw1BoAbHww3Df0W4j52XTThRksKDu-YdDUy5RbLyxuW5K3FSSqyzPEa4gQJfITEgPfJWG4rhHEdry5zlMoySxzIFGfiRnp-oUrifMthD0asfMCz+QuraLL2rScjy16SEch4rdM7KrdN4THbdeMMnAACKgTsq1yCnQdM9TYcxybX3D2PUCKIDOlIEyGyDwl-WRyviiFIlnfbjxQjL6BMdQyDOdwmjmVCMfVOhwfWgyE-zMHwT92QPJzFsmnds0V+Q8TUBzASNdBYd2fl3DyYxZ5bj7pyAeUCEGK1Zj3E+rMJzR0eKTeawcYE0zpirE+UcpwS1BETJO5lhKiWVHhTilIZCc3ROIHeUshrPSgOLVuqDI7d3gb3Ik-dHicLkHQxUDC0HEKJJQhO18kBsO4cqeKflA62GxlbXKxZ5YaJ+DlIs+U0gaDUYgSRYk2QyEMXlXA595RSNxAYwstjSymIJp8IAA

// Refs
// https://github.com/localForage/localForage
// https://github.com/TanStack/query/blob/main/packages/query-sync-storage-persister/src/index.ts

/**
 * Packages:
 * - @storage/hash
 * - @storage/logger
 * - @storage/memory
 * 
 * Features:
 * - Prefixed storage (because is shared on domain)
 * - Multiple custom persisters
 * - If error uses the fallback
 * - Optional logger
 * - Throttle time
 * - Type-safe returns
 * - Parsable returns
 */

interface Storage {
  getItem: (key: string) => string | null
  setItem: (key: string, value: string) => void
  removeItem: (key: string) => void
}

interface CreateStoragePersisterOptions {
  storage: Storage
  fallbackStorage?: Storage
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
