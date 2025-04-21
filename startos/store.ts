import { setupExposeStore } from '@start9labs/start-sdk'

export type Store = {
  adminPassCreated: boolean
}

export const initStore: Store = {
  adminPassCreated: false,
}

export const exposedStore = setupExposeStore<Store>(() => [])
