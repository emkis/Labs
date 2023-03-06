import { z } from 'zod'
import { createStoragePersister } from './index';

const localStoragePersister = createStoragePersister({
  storage: localStorage,
  serializeValue: JSON.stringify,
  deserializeValue: JSON.parse,
  testMode: true,
})

const sessionStoragePersister = createStoragePersister({
  storage: sessionStorage,
  testMode: true,
})



type Theme = { id: string }
const transformTheme = (): Theme => ({ id: 'dark' })
const Payment = z.object({
  id: z.string(),
  method: z.string(),
});

// Setting items
localStoragePersister.setItem('theme', 'dracula')

const removeItem = localStoragePersister.setItem('theme', 'dracula')
removeItem()


// Getting
const unsafeTheme = localStoragePersister.getItem('theme')
const safeTheme = localStoragePersister.getItem('theme', { parse: transformTheme })


const one = localStoragePersister.getItem('one')
const two = localStoragePersister.getItem('two', { parse: transformTheme })
const three = localStoragePersister.getItem('three', { parse: Payment.parse })
const four = localStoragePersister.getItem('four', { parse: Payment.safeParse })

four 
  ? four.success
    ? four.data.method
    : null 
  : null