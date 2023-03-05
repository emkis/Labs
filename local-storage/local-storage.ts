import { validateStorageItem } from './local-storage-validators'
import { createKey } from './local-storage-key'

type CreateStorageOptions = {
  keyPrefix: string
}

export function createLocalStorageService({ keyPrefix }: CreateStorageOptions) {
  return {
    get<T>(key: string): T | null {
      const customKey = createKey({ prefix: keyPrefix, key })
      const isValidData = validateStorageItem(customKey)
      if (!isValidData) return null

      const rawData = localStorage.getItem(customKey) as string
      return JSON.parse(rawData)
    },

    set<T>(key: string, data: T): void {
      const customKey = createKey({ prefix: keyPrefix, key })
      localStorage.setItem(customKey, JSON.stringify(data))
    },

    delete(key: string): void {
      const customKey = createKey({ prefix: keyPrefix, key })
      localStorage.removeItem(customKey)
    },
  }
}