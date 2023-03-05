import { createLocalStorageService } from './index';

const safeLocalStorage = createLocalStorageService({ keyPrefix: 'app-name' })

type User = { 
  id: string
  name: string
}

// no need to stringify
safeLocalStorage.set('user', { id: 'hfj', name: 'nick garden' })

// User | null
const typedUser = safeLocalStorage.get<User>('user')

// Without Generic the type is `unknown` by default
const unknownUser = safeLocalStorage.get('user')

safeLocalStorage.delete('user')
