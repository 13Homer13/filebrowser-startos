import { sdk } from './sdk'
import { exposedStore } from './store'
import { setDependencies } from './dependencies'
import { setInterfaces } from './interfaces'
import { versions } from './versions'
import { actions } from './actions'
import { jsonFile } from './file-models/filebrowser.json'
import { configDefaults, mnt } from './utils'
import { resetAdminUser } from './actions/resetAdminUser'

// **** Install ****
const install = sdk.setupInstall(async ({ effects }) => {
  await jsonFile.write(effects, configDefaults)

  await sdk.runCommand(
    effects,
    { imageId: 'filebrowser' },
    ['/filebrowser', '-c', `${mnt}/filebrowser.json`, 'config', 'init'],
    {
      mounts: sdk.Mounts.of().addVolume('main', null, '/root', false).build(),
    },
    'setadmin',
  )

  await sdk.runCommand(
    effects,
    { imageId: 'filebrowser' },
    [
      '/filebrowser',
      '-c',
      `${mnt}/filebrowser.json`,
      'users',
      'add',
      'admin',
      'taxationistheft',
    ],
    {
      mounts: sdk.Mounts.of().addVolume('main', null, '/root', false).build(),
    },
    'setadmin',
  )

  await sdk.store.setOwn(effects, sdk.StorePath.adminPassCreated, false)
  await sdk.action.requestOwn(effects, resetAdminUser, 'critical', {
    reason: 'Create your admin user password',
  })
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
