import BigNumber from 'bignumber.js/bignumber'

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

const MAIN_DOMAIN = process.env.REACT_APP_MAIN_DOMAIN
const EXCHANGE_URL = process.env.REACT_APP_EXCHANGE_URL

export const SUGAR_PER_BLOCK = new BigNumber(0.16)
export const SECONDS_PER_YEAR = new BigNumber(60 * 60 * 24 * 365)
export const VAULTS_DISTRIBUTION_PERCENTAGE = 0.94
export const BASE_URL = `https://${MAIN_DOMAIN}`
export const BASE_ADD_LIQUIDITY_URL = `${EXCHANGE_URL}/#/add`
export const BASE_LIQUIDITY_POOL_URL = `${EXCHANGE_URL}/#/pool`
export const LOTTERY_MAX_NUMBER_OF_TICKETS = 50
export const LOTTERY_TICKET_PRICE = 1
export const START_TIMESTAMP = 1678807800
