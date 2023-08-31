import tokens from './tokens'
import { FarmConfig } from './types'

const farms: FarmConfig[] = [
  {
    pid: 1,
    lpSymbol: 'WETH-USDC LP',
    lpAddresses: {
      324: '0x16CC5D86Df6bb84b1ba6DeafF95783bE52F1bb61',
      280: '',
    },
    token: tokens.weth,
    quoteToken: tokens.usdc,
  },
]

export default farms
