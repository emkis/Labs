import hash from 'hash-string'
import { environment } from '@shared/environment'

function hashString(text: string) {
  return hash(text)
}

type CreateKeyOptions = {
  prefix: string
  key: string
}

export function createKey({ prefix, key }: CreateKeyOptions) {
  const publicKey = `${prefix}${key}`
  const hashedKey = environment.isProduction ? hashString(publicKey) : publicKey
  return hashedKey
}