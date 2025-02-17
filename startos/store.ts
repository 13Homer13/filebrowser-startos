import { setupExposeStore } from '@start9labs/start-sdk'

export type Store = {
  adminUserCreated: boolean
}

export const exposedStore = setupExposeStore<Store>(() => [])
