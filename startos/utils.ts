import { Effects } from '@start9labs/start-sdk/base/lib/Effects'
import { sdk } from './sdk'

export const uiPort = 8080

export const mnt = '/root'

export const randomPassword = {
  charset: 'a-z,A-Z,1-9,!,@,$,%,&,*',
  len: 22,
}

export const configDefaults = {
  port: uiPort,
  baseURL: '',
  address: '0.0.0.0',
  log: 'stdout',
  database: `${mnt}/filebrowser.db`,
  root: `${mnt}/data`,
  tokenExpirationTime: '2h',
}

export function tokenExpirationToNumber(val: string): number {
  return Number(val.replace(/\D/g, ''))
}

export async function getPrimaryInterfaceUrls(
  effects: Effects,
): Promise<string[]> {
  const httpInterface = await sdk.serviceInterface.getOwn(effects, 'ui').const()

  return httpInterface?.addressInfo?.urls || []
}
