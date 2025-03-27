import { matches, FileHelper } from '@start9labs/start-sdk'
import { configDefaults } from '../utils'

const { port, baseURL, address, log, tokenExpirationTime } =
  configDefaults
const { object, string, literal } = matches

const shape = object({
  port: literal(port).onMismatch(port),
  baseURL: string.onMismatch(baseURL),
  address: literal(address).onMismatch(address),
  log: literal(log).onMismatch(log),
  tokenExpirationTime: string.onMismatch(tokenExpirationTime),
})

export const jsonFile = FileHelper.json(
  '/media/startos/volumes/main/filebrowser.json',
  shape.onMismatch(configDefaults),
)
