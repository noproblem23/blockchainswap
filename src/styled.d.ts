import 'styled-components'

import { PancakeTheme } from 'sugarswap-uikit/dist/theme'

declare module 'styled-components' {
  /* tslint:disable */
  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface DefaultTheme extends PancakeTheme {}
}
