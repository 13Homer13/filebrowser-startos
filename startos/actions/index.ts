import { sdk } from '../sdk'
import { resetAdminUser } from './resetAdminUser'
import { setExpiration } from './setExpiration'
import { setPrimaryUrl } from './setPrimaryUrl'

export const actions = sdk.Actions.of()
  .addAction(setPrimaryUrl)
  .addAction(setExpiration)
  .addAction(resetAdminUser)
