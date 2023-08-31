import { Ifo } from './types'

const MAIN_DOMAIN = process.env.REACT_APP_MAIN_DOMAIN

const ifos: Ifo[] = [
  {
    id: 'sugar',
    address: '0xaFEA5e6E1424f401d58A70C103A182e6C11E8fbd',
    isActive: true,
    isPrivate: true,
    name: 'SugarSwap is a decentralized exchange (DEX) ',
    description:
      'SugarSwap is a decentralized exchange (DEX) that is specifically designed to cater to the needs of crypto-native users who want to trade, earn rewards, and participate in gaming activities. As a DEX, SugarSwap operates on the zkSync network, which offers faster transaction times and lower fees compared to the Ethereum mainnet.',
    launchDate: 'Friday, April 28, 2023',
    launchTime: '8:00:00 PM',
    saleAmount: '300,000 SUGAR',
    raiseAmount: '30 WETH',
    cakeToBurn: '$1,500,000',
    projectSiteUrl: `https://${MAIN_DOMAIN}`,
    currency: 'WETH',
    currencyAddress: '0x5BF9c6c4027670447224A931C731006Ef04Ab953',
    currencyDecimals: 18,
    tokenDecimals: 18,
    tokenSymbol: 'SugarToken',
    releaseTime: 1682553600, // April 27, 2023 12:00:00 AM
    campaignId: '511080000',
    maxDepositAmount: 2,
  },
]

export default ifos
