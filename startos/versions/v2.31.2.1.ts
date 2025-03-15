import { VersionInfo, IMPOSSIBLE } from '@start9labs/start-sdk'
import { readFile, rmdir } from 'fs/promises'
import { load } from 'js-yaml'
import { jsonFile } from '../file-models/filebrowser.json'
import { configDefaults } from '../utils'

export const v_2_31_2_1 = VersionInfo.of({
  version: '2.31.2:1',
  releaseNotes: 'Revamped for StartOS 0.3.6',
  migrations: {
    up: async ({ effects }) => {
      // get old config.yaml
      const configYaml = load(
        await readFile('/root/start9/config.yaml', 'utf-8'),
      ) as { userTimeout: string }

      await jsonFile.write(effects, {
        ...configDefaults,
        tokenExpirationTime: `${configYaml.userTimeout}h`,
      })

      // remove old start9 dir
      await rmdir('/root/start9')
    },
    down: IMPOSSIBLE,
  },
})
