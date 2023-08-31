import { SettingsObject, SettingsType } from './types'

const MAIN_DOMAIN = process.env.REACT_APP_MAIN_DOMAIN
const BASE_URL = `https://${MAIN_DOMAIN}`
const settings: SettingsObject[] = [
  {
    name: 'ifos',
    url: `${BASE_URL}/ifos`,
    type: SettingsType.IFO,
  },
  {
    name: 'pools',
    url: `${BASE_URL}/pools`,
    type: SettingsType.POOL,
  },
  {
    name: 'farms',
    url: `${BASE_URL}/farms`,
    type: SettingsType.FARM,
  },
]
export default settings
