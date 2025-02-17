import { sdk } from './sdk'
import { exposedStore } from './store'
import { setDependencies } from './dependencies'
import { setInterfaces } from './interfaces'
import { versions } from './versions'
import { actions } from './actions'
import { jsonFile } from './file-models/filebrowser.json'
import { configDefaults } from './utils'
import { resetAdminUser } from './actions/resetAdminUser'

// **** Install ****
const install = sdk.setupInstall(async ({ effects }) => {
  await jsonFile.write(configDefaults)
  await sdk.store.setOwn(effects, sdk.StorePath.adminUserCreated, false)
  await sdk.action.requestOwn(effects, resetAdminUser, 'critical', {})
})

// **** Uninstall ****
const uninstall = sdk.setupUninstall(async ({ effects }) => {})

/**
 * Plumbing. DO NOT EDIT.
 */
export const { packageInit, packageUninit, containerInit } = sdk.setupInit(
  versions,
  install,
  uninstall,
  setInterfaces,
  setDependencies,
  actions,
  exposedStore,
)
