import { MenuEntry } from 'sugarswap-uikit'
import { ContextApi } from 'contexts/Localization/types'

const MAIN_DOMAIN = process.env.REACT_APP_MAIN_DOMAIN
const MAIN_URL = process.env.REACT_APP_MAIN_URL

const config: (t: ContextApi['t']) => MenuEntry[] = (t) => [
  {
    label: t('Trade'),
    icon: 'TradeIcon',
    items: [
      {
        label: t('Exchange'),
        href: `${MAIN_URL}/swap`,
        target: '_self',
      },
      {
        label: t('Liquidity'),
        href: `${MAIN_URL}/pool`,
        target: '_self',
      },
      // {
      //   label: 'Zap',
      //   href: `/zap`,
      // },
    ],
  },
  // {
  //   label: t('Competition'),
  //   icon: 'LotteryIcon',
  //   items: [
  //     {
  //       label: t('BOW Token'),
  //       href: '/campaigns/0',
  //     },
  //   ],
  // },
  {
    label: t('Farm'),
    icon: 'FarmIcon',
    href: '#farms',
  },
  {
    label: t('Staking'),
    icon: 'PoolIcon',
    href: '#staking',
  },
  {
    label: t('Bake'),
    icon: 'PoolIcon',
    href: '#bake',
  },
  {
    label: t('SugarDaddy'),
    icon: 'PoolIcon',
    href: '/sugar-daddy',
  },
  // {
  //   label: t('Hunt'),
  //   icon: 'HuntIcon',
  //   href: '/hunt',
  // },
  // // {
  // //   label: t('Vaults'),
  // //   icon: 'VaultIcon',
  // //   href: '/vaults',
  // // },
  // {
  //   label: t('Lottery'),
  //   icon: 'TicketIcon',
  //   href: '/lottery',
  // },
  // // {
  // //   label: 'Bridge',
  // //   icon: 'BridgeIcon',
  // //   href: '/bridge',
  // //   tag: 'new',
  // // },
  // // {
  // //   label: t('NFT Marketplace'),
  // //   icon: 'NftIcon',
  // //   href: '/marketplace',
  // // },
  // {
  //   label: 'BowPad',
  //   icon: 'IfoIcon',
  //   href: '/ido',
  // },
  // {
  //   label: t('Info'),
  //   icon: 'InfoIcon',
  //   href: `https://info.${MAIN_DOMAIN}/home`,
  //   target: '_blank',
  // },
  // {
  //   label: t('Multisender'),
  //   icon: 'DisperseIcon',
  //   href: '/disperse',
  // },
  // {
  //   label: t('Partnership'),
  //   icon: 'PartnerIcon',
  //   href: 'https://docs.google.com/forms/d/e/1FAIpQLSffYIbIQYYjr52AeRolVPcNNTF6vIjS3qTUACa9UpbIlFVp7w/viewform',
  //   target: '_blank',
  // },
  {
    label: t('Audit'),
    icon: 'AuditIcon',
    href: `https://docs.${MAIN_DOMAIN}/product-and-features-guide/audit`,
    target: '_blank',
  },
  // {
  //   label: 'Listing',
  //   icon: 'ReferralIcon',
  //   items: [
  //     {
  //       label: 'Snowtrace Explorer',
  //       href: 'https://explorer.zksync.io/token/0x695Fa794d59106cEbd40ab5f5cA19F458c723829',
  //       target: '_blank',
  //     },
  //     {
  //       label: 'DappRadar',
  //       href: '#',
  //     },
  //     {
  //       label: 'CoinGecko',
  //       href: '#',
  //     },
  //     {
  //       label: 'CoinMarketCap',
  //       href: '#',
  //     },
  //   ],
  // },
  {
    label: t('More'),
    icon: 'MoreIcon',
    items: [
      {
        label: t('Docs'),
        href: `https://docs.${MAIN_DOMAIN}`,
        target: '_blank',
      },
      {
        label: t('Medium'),
        href: 'https://medium.com/@UseSugarSwap',
        target: '_blank',
      },
      // {
      //   label: t('Dexscreener'),
      //   href: 'https://dexscreener.com/core/0xbb8502132c87ee31be0e2bc1cb8cc69374488261',
      //   target: '_blank',
      // },
      // {
      //   label: t('Gecko Terminal'),
      //   href: 'https://geckoterminal.com/core/sugarswap/pools',
      //   target: '_blank',
      // },
      // {
      //   label: t('Vote'),
      //   href: `https://vote.${MAIN_DOMAIN}/`,
      //   target: '_blank',
      // },
    ],
  },
]

export default config
