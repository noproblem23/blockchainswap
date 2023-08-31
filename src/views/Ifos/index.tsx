/* eslint-disable react/react-in-jsx-scope */
import { useTranslation } from 'contexts/Localization'
import { Route, useRouteMatch } from 'react-router-dom'
import styled from 'styled-components'
import { Button, Flex, Text } from 'sugarswap-uikit'
import CurrentIfo from './CurrentIfo'
import PastIfo from './PastIfo'
import IfoTabButtons from './components/IfoTabButtons'

const Background = styled.div`
  //
`

const Container = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: 992px;
  padding-left: 16px;
  padding-right: 16px;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding-left: 24px;
    padding-right: 24px;
  }
`

const Page = styled(Container)`
  min-height: calc(100vh - 64px);
  padding: 0px 30px;
  max-width: 1280px;
  display: flex;
  flex-direction: row;
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

const Header = styled.div`
  color: #ffffff;
  font-weight: 700;
  font-style: normal;
  h1 {
    font-size: 64px;
    line-height: 140%;
  }
  h6 {
    font-size: 20px;
    line-height: 180%;
    opacity: 0.7;
  }

  @media (max-width: 767px) {
    h1 {
      font-size: 40px;
    }
  }
`

const ColumnLeft = styled.div`
  display: flex;
  flex-direction: column;
  flex: 3;
  margin-top: 50px;

  @media (max-width: 767px) {
    flex: 0;
  }
`
const ColumnRight = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  margin-bottom: 30px;

  @media (max-width: 767px) {
    margin-top: 50px;
  }
`

const MAIN_DOMAIN = process.env.REACT_APP_MAIN_DOMAIN

const Ifos: React.FC = () => {
  const { t } = useTranslation()
  const { path } = useRouteMatch()

  return (
    <Background>
      <Page>
        <ColumnLeft>
          <Header>
            <h1>{t('SugarDaddy')}</h1>
            <h6>{t('Buy brand new tokens with a brand new token sale modal')}</h6>
          </Header>
          <IfoTabButtons />
          <Route exact path={`${path}`}>
            <CurrentIfo />
          </Route>
          <Route path={`${path}/history`}>
            <PastIfo />
          </Route>
        </ColumnLeft>
        <ColumnRight>
          <Text fontSize="24px" fontWeight={700} fontStyle="normal" lineHeight="140%">
            {t('How to take part')}:
          </Text>

          <Flex flexDirection="column" marginTop="16px">
            <Text fontSize="14px" fontWeight={700} fontStyle="normal" lineHeight="200%">
              {t('Before sale')}:
            </Text>
            <Text fontSize="14px" fontWeight={500} fontStyle="normal" lineHeight="200%">
              {t('Purchase SWEET')}
            </Text>
          </Flex>

          <Flex flexDirection="column" marginTop="16px">
            <Text fontSize="14px" fontWeight={700} fontStyle="normal" lineHeight="200%">
              {t('For private sale')}:
            </Text>
            <Text fontSize="14px" fontWeight={500} fontStyle="normal" lineHeight="200%">
              {t('Optional: You have to be whitelisted')}
            </Text>
          </Flex>

          <Flex flexDirection="column" marginTop="16px">
            <Text fontSize="14px" fontWeight={700} fontStyle="normal" lineHeight="200%">
              {t('During sale')}:
            </Text>
            <Text fontSize="14px" fontWeight={500} fontStyle="normal" lineHeight="200%">
              {t('While the sale is live, commit your SWEET')}
            </Text>
          </Flex>

          <Flex flexDirection="column" marginTop="16px">
            <Text fontSize="14px" fontWeight={700} fontStyle="normal" lineHeight="200%">
              {t('After sale')}:
            </Text>
            <Text fontSize="14px" fontWeight={500} fontStyle="normal" lineHeight="200%">
              {t('Claim the tokens bought, along with unspent funds')}
            </Text>
          </Flex>

          <Button
            as="a"
            href="https://forms.gle/2XNSiJFuehvZsGjZ9"
            external
            width="80%"
            marginTop="14px"
            style={{ fontSize: '14px' }}
          >
            {t('White List')}
          </Button>

          {/* <Button
            as="a"
            href={`https://docs.${MAIN_DOMAIN}/products-and-features-guide/token-sales`}
            external
            width="80%"
            marginTop="14px"
            style={{ fontSize: '14px' }}
          >
            {t('Learn More')}
          </Button> */}

          {/* <Text fontSize="24px" fontWeight={700} fontStyle="normal" lineHeight="140%" marginTop="64px">
            {t('Want to launch your own Token Sale?')}
          </Text>
          <Button
            as="a"
            href="https://docs.google.com/forms/d/e/1FAIpQLSffYIbIQYYjr52AeRolVPcNNTF6vIjS3qTUACa9UpbIlFVp7w/viewform"
            external
            width="80%"
            marginTop="14px"
            style={{ fontSize: '14px' }}
          >
            {t('Learn About Partnering!')}
          </Button> */}
        </ColumnRight>
      </Page>
    </Background>
  )
}

export default Ifos
