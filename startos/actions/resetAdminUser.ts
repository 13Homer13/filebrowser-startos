import { utils } from '@start9labs/start-sdk'
import { sdk } from '../sdk'
import { randomPassword } from '../utils'

export const resetAdminUser = sdk.Action.withoutInput(
  // id
  'reset-admin-user',

  // metadata
  async ({ effects }) => {
    const adminExists = await sdk.store
      .getOwn(effects, sdk.StorePath.adminUserCreated)
      .const()

    const nameStr = 'Admin User'
    const descStr = 'your admin username and password'

    return {
      name: adminExists ? `Reset ${nameStr}` : `Create ${nameStr}`,
      description: adminExists ? `Reset ${descStr}` : `Create ${descStr}`,
      warning: null,
      allowedStatuses: 'any',
      group: null,
      visibility: 'enabled',
    }
  },

  // the execution function
  async ({ effects }) => {
    const password = utils.getDefaultString(randomPassword)

    await sdk.runCommand(
      effects,
      { imageId: 'filebrowser' },
      [
        'filebrowser',
        'users',
        'update',
        '1',
        '-u',
        adminUsername,
        '-p',
        password,
        '--perm.admin',
        '>/dev/null',
      ],
      {},
      'setadmin',
    )

    await sdk.store.setOwn(effects, sdk.StorePath.adminUserCreated, true)

    return {
      version: '1',
      title: 'Success!',
      message:
        'Your admin username and password are below. Write them down or save them to a password manager.',
      result: {
        type: 'group',
        value: [
          {
            type: 'single',
            name: 'Username',
            description: null,
            value: adminUsername,
            masked: false,
            copyable: true,
            qr: false,
          },
          {
            type: 'single',
            name: 'Password',
            description: null,
            value: password,
            masked: true,
            copyable: true,
            qr: false,
          },
        ],
      },
    }
  },
)

const adminUsername = 'admin'
