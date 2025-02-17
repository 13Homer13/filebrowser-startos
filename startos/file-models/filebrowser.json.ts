import { matches, FileHelper } from '@start9labs/start-sdk'
import { configDefaults } from '../utils'

const { port, baseURL, address, log, database, root, tokenExpirationTime } =
  configDefaults
const { object, string, literal } = matches

const shape = object({
  port: literal(port).onMismatch(port),
  baseURL: string.optional(baseURL).onMismatch(baseURL), // @TODO
  address: literal(address).onMismatch(address),
  log: literal(log).onMismatch(log),
  database: literal(database).onMismatch(database),
  root: literal(root).onMismatch(root),
  tokenExpirationTime: string.onMismatch(tokenExpirationTime),
})

export const jsonFile = FileHelper.json(
  '/media/startos/volumes/main/filebrowser.json',
  shape.onMismatch(configDefaults),
)
