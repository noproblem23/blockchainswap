const MAIN_DOMAIN = process.env.REACT_APP_MAIN_DOMAIN

const tokens = {
  core: {
    symbol: 'CORE',
    projectLink: 'https://coredao.org/',
  },
  eth: {
    symbol: 'WETH',
    address: {
      324: '0x5AEa5775959fBC2557Cc8789bC1bf90A239D9a91',
      280: '0x5AEa5775959fBC2557Cc8789bC1bf90A239D9a91',
    },
    decimals: 18,
    projectLink: 'https://weth.io/',
  },
  usdc: {
    symbol: 'USDC',
    address: {
      324: '0x3355df6D4c9C3035724Fd0e3914dE96A5a83aaf4',
      280: '0x0faF6df7054946141266420b43783387A78d82A9',
    },
    decimals: 6,
    projectLink: 'https://www.centre.io/',
  },
  dai: {
    symbol: 'DAI',
    address: {
      280: '0x3e7676937A7E96CFB7616f255b9AD9FF47363D4b',
      324: '0x6De33698e9e9b787e09d3Bd7771ef63557E148bb',
    },
    decimals: 18,
    projectLink: 'https://makerdao.com/',
  },
  btc: {
    symbol: 'WBTC',
    address: {
      280: '0x0BfcE1D53451B4a8175DD94e6e029F7d8a701e9c',
      324: '0xad543f18cFf85c77E140E3E5E3c3392f6Ba9d5CA',
    },
    decimals: 18,
    projectLink: 'https://www.wbtc.network/',
  },
  link: {
    symbol: 'LINK',
    address: {
      280: '0x40609141Db628BeEE3BfAB8034Fc2D8278D0Cc78',
      324: '0xad543f18cFf85c77E140E3E5E3c3392f6Ba9d5CA',
    },
    decimals: 18,
    projectLink: 'https://www.wbtc.network/',
  },
  sugar: {
    symbol: 'SUGAR',
    address: {
      324: '0x7B7e44B0D27F129cFa180326f9a4c00F069C335E',
      280: '0xaFEA5e6E1424f401d58A70C103A182e6C11E8fbd',
    },
    decimals: 18,
    projectLink: `https://${MAIN_DOMAIN}`,
  },
  xsugar: {
    symbol: 'xSUGAR',
    address: {
      324: '0xeBf78ffD8Ab980bD9fE71c8eA0d6ec7f925775Ff',
      280: '0x71690f08C530B8b46e0AEc1671DD61e9d7193CF7',
    },
    decimals: 18,
    projectLink: `https://${MAIN_DOMAIN}`,
  },
  weth: {
    symbol: 'WETH',
    address: {
      324: '0x5AEa5775959fBC2557Cc8789bC1bf90A239D9a91',
      280: '0x07195f9ACD0a0187569282491CFBa8903D4BD717',
    },
    decimals: 18,
    projectLink: `https://${MAIN_DOMAIN}`,
  },
  wcore: {
    symbol: 'WCORE',
    address: {
      324: '0x40375c92d9faf44d2f9db9bd9ba41a3317a2404f',
      280: '',
    },
    decimals: 18,
    projectLink: 'https://coredao.org/',
  },
  hunt: {
    symbol: 'HUNT',
    address: {
      324: '0x962D45C91e2e4f29DdC96C626976ECE600908Ba6',
      280: '',
    },
    decimals: 18,
    projectLink: `https://${MAIN_DOMAIN}`,
  },
  usdt: {
    symbol: 'USDT',
    address: {
      324: '0x900101d06A7426441Ae63e9AB3B9b0F63Be145F1',
      280: '',
    },
    decimals: 6,
    projectLink: 'https://tether.to/',
  },
  fourToken: {
    symbol: '4TOKEN',
    address: {
      324: '0x98564E70c7fCC6d947fFE6d9EfeD5ba68b306F2E',
      280: '',
    },
    decimals: 18,
    projectLink: 'https://4ignorefud.com',
  },
  matic: {
    symbol: 'MATIC',
    address: {
      324: '0xdd90E5E87A2081Dcf0391920868eBc2FFB81a1aF',
      280: '',
    },
    decimals: 18,
    projectLink: 'https://polygon.technology/',
  },
  bnb: {
    symbol: 'WBNB',
    address: {
      324: '0x7f27352D5F83Db87a5A3E00f4B07Cc2138D8ee52',
      280: '',
    },
    decimals: 18,
    projectLink: 'https://www.binance.com/',
  },
  busd: {
    symbol: 'BUSD',
    address: {
      324: '0x4Bf769b05E832FCdc9053fFFBC78Ca889aCb5E1E',
      280: '',
    },
    decimals: 18,
    projectLink: 'https://www.binance.com/',
  },
}

export default tokens
