import styled from 'styled-components'

import Container from './Container'

const Page = styled(Container)`
  min-height: calc(100vh - 64px);
  padding: 0px 30px;
  max-width: 1280px;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding-top: 24px;
    padding-bottom: 24px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    padding-top: 12px;
    padding-bottom: 32px;
  }

  @media (max-width: 767px) {
    flex-direction: column;
    padding-left: 16px;
    padding-right: 16px;
  }
`

export default Page
