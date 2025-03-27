export const uiPort = 8080

export const randomPassword = {
  charset: 'a-z,A-Z,1-9,!,@,$,%,&,*',
  len: 22,
}

export const mnt = '/root'

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
