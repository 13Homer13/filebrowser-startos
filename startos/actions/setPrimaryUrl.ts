import { jsonFile } from '../file-models/filebrowser.json'
import { sdk } from '../sdk'
import { getPrimaryInterfaceUrls } from '../utils'

const { InputSpec, Value } = sdk

export const inputSpec = InputSpec.of({
  url: Value.dynamicSelect(async ({ effects }) => {
    const urls = await getPrimaryInterfaceUrls(effects)

    return {
      name: 'URL',
      description:
        'Selecting "Dynamic" means Filebrowser will use whatever URL is present in the URL bar of the browser to product links, send invites, etc.',
      values: urls.reduce(
        (obj, url) => ({
          ...obj,
          [url]: url,
        }),
        {
          dynamic: 'Dynamic',
        } as Record<string, string>,
      ),
      default: 'dynamic',
    }
  }),
})

export const setPrimaryUrl = sdk.Action.withInput(
  // id
  'set-primary-url',

  // metadata
  async ({ effects }) => ({
    name: 'Set Primary Url',
    description:
      'Choose which of your Filebrowser URLs should serve as the primary URL for the purposes of sharing files, sending invites, etc.',
    warning: null,
    allowedStatuses: 'any',
    group: null,
    visibility: 'enabled',
  }),

  // form input specification
  inputSpec,

  // optionally pre-fill the input form
  async ({ effects }) => ({
    url: (await jsonFile.read.const(effects))!.baseURL || 'dynamic',
  }),

  // the execution function
  async ({ effects, input }) =>
    jsonFile.merge(effects, {
      baseURL: input.url === 'dynamic' ? '' : input.url,
    }),
)
