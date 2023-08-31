import { useWeb3React } from '@web3-react/core'
import Page from 'components/layout/Page'
import { useTranslation } from 'contexts/Localization'
import { useHunterCallback, useHunterData } from 'hooks/useHunterData'
import useTheme from 'hooks/useTheme'
import { useTracker } from 'hooks/useTracker'
import React from 'react'
import { useRouteMatch } from 'react-router-dom'
import { usePriceHunterUsd } from 'state/hooks'
import styled from 'styled-components'
import { Button, Flex, LinkExternal, Text, WarningIcon } from 'sugarswap-uikit'
import { getHunterAddress } from 'utils/addressHelpers'
import { getBalanceNumber } from 'utils/formatBalance'

const EXCHANGE_URL = process.env.REACT_APP_EXCHANGE_URL

const HuntView: React.FC = () => {
  const price = usePriceHunterUsd()
  const { path } = useRouteMatch()
  const { t } = useTranslation()
  const { isDark } = useTheme()
  const { balance, claimableCore, claimedCore } = useHunterData()
  const { handleClaim, handleCompound, pending } = useHunterCallback()
  const { totalDividendsDistributed } = useTracker()
  const { account } = useWeb3React()

  return (
    <Background>
      <Page>
        <Header>
          <Flex justifyContent="space-between" alignItems="center">
            <h1>{t('Bake')}</h1>
            <Flex flexDirection="row">
              <Flex flexDirection="column" marginRight="24px">
                <Title>{t('Price')}</Title>
                <ValueText>${price.toNumber().toFixed(4)}</ValueText>
              </Flex>
              <Flex flexDirection="column">
                <Title>{t('Supply')}</Title>
                <ValueText>1,000,000</ValueText>
              </Flex>
            </Flex>
          </Flex>
          <h6>{t('BAKE is a next-generation xWhatever reward token on the ZkSync Era ecosystem.')}</h6>
        </Header>

        <BodyContent>
          <Flex flex={1} alignItems="center">
            <Text className="text">
              {t(
                '4% of every transaction made with the HUNT tokens, goes back to holders of HUNT in ZkSync Era rewards. With the recent boom in DeFi, our goal here at SugarSwap is to make DeFi easy and accessible to everyone. DeFi does not have to be difficult, it can be as easy as buying and holding a token to earn passive income',
              )}
            </Text>
          </Flex>
          <BakeCard>
            <Flex>
              <Flex flexDirection="column" flex={1}>
                <TextSugar color="sugar">{t('My bake balance')}</TextSugar>
                <TextSugarValue>
                  {getBalanceNumber(balance).toLocaleString('en-US', {
                    maximumFractionDigits: 2,
                  })}
                  &nbsp;BAKE
                </TextSugarValue>
              </Flex>

              <Flex flexDirection="column" flex={1}>
                <TextSugar color="sugar">{t('Total Dividends Distributed')}</TextSugar>
                <TextSugarValue>
                  {getBalanceNumber(totalDividendsDistributed).toLocaleString('en-US', { maximumFractionDigits: 2 })}
                  &nbsp;BAKE
                </TextSugarValue>
              </Flex>

              <Flex flexDirection="column" flex={1}>
                <TextSugar color="sugar">{t('Claimable')}</TextSugar>
                <TextSugarValue>
                  {getBalanceNumber(claimableCore).toLocaleString('en-US', { maximumFractionDigits: 2 })}&nbsp;BAKE
                </TextSugarValue>
                <Flex alignItems="center">
                  <Text color="textSubtle" fontSize="14px" fontWeight={500} style={{ opacity: '0.7' }}>
                    {t('Total Claimed')}:&nbsp;
                  </Text>
                  <Text fontWeight="bold" fontSize="14px">
                    {getBalanceNumber(claimedCore).toLocaleString('en-US', { maximumFractionDigits: 2 })}
                  </Text>
                </Flex>
              </Flex>
            </Flex>
            <Flex justifyContent="space-between" marginTop="24px">
              <ButtonBold>{t('Harvest')}</ButtonBold>
              <ButtonTransparent>{t('Compound')}</ButtonTransparent>
            </Flex>
            <Flex flexDirection="row" justifyContent="center" marginTop="12px" alignItems="center">
              <WarningIcon color="failure" />
              <Text fontWeight={500} fontSize="12px" color="#000000">
                {t('You need an Extra 10 SWEET to gain dividends')}
              </Text>
              &nbsp;
              <a href={`${EXCHANGE_URL}/ido`}>
                <Text fontWeight={500} fontSize="12px" color="sugar" style={{ cursor: 'pointer' }}>
                  {t('Buy SWEET')}
                </Text>
              </a>
            </Flex>
          </BakeCard>
        </BodyContent>

        <PriceAndSupply>
          <Flex flexDirection="row" flex={1} className="price">
            <Flex flexDirection="column" className="price-item" marginRight="36px">
              <TextTitle>{t('Ticker')}</TextTitle>
              <TextValue>BAKE</TextValue>
            </Flex>
            <Flex flexDirection="column" className="price-item" marginRight="36px">
              <TextTitle>{t('Max Supply')}</TextTitle>
              <TextValue>1,000,000</TextValue>
            </Flex>
            <Flex flex={1} flexDirection="column" className="price-item">
              <TextTitle>{t('Contract Address')}</TextTitle>
              <a href={`https://explorer.zksync.io/token/${getHunterAddress()}`} rel="noreferrer" target="_blank">
                <TextValue style={{ display: 'flex' }}>
                  {`${getHunterAddress().substring(0, 7)}...${getHunterAddress().substring(37)}`} <LinkExternal />
                </TextValue>
              </a>
            </Flex>
          </Flex>

          <Flex className="supply" flex={1} justifyContent="space-between">
            <FlexColumn className="supply-item">
              <TextTitle>{t('Public Sale')}</TextTitle>
              <TextPresent>30%</TextPresent>
            </FlexColumn>
            <FlexColumn className="supply-item">
              <TextTitle>{t('Whitelist sale')}</TextTitle>
              <TextPresent>20%</TextPresent>
            </FlexColumn>
            <FlexColumn className="supply-item">
              <TextTitle>{t('Initial Liquidity')}</TextTitle>
              <TextPresent>25%</TextPresent>
            </FlexColumn>
            <FlexColumn className="supply-item">
              <TextTitle>{t('SWEET holders')}</TextTitle>
              <TextPresent>5%</TextPresent>
            </FlexColumn>
            <FlexColumn className="supply-item">
              <TextTitle>{t('DAO Fund')}</TextTitle>
              <TextPresent>10%</TextPresent>
            </FlexColumn>
            <FlexColumn className="supply-item">
              <TextTitle>{t('Team')}</TextTitle>
              <TextPresent>10%</TextPresent>
            </FlexColumn>
          </Flex>
        </PriceAndSupply>

        <HuntTokenExtraDetails>
          <FlexColumn className="item">
            <TextTitle>{t('Reflection to Holder')}</TextTitle>
            <TextPresent>4%</TextPresent>
          </FlexColumn>
          <FlexColumn className="item">
            <TextTitle>{t('Treasury')}</TextTitle>
            <TextPresent>0%</TextPresent>
          </FlexColumn>
          <FlexColumn className="item">
            <TextTitle>{t('Increase Liquidity')}</TextTitle>
            <TextPresent>0%</TextPresent>
          </FlexColumn>
          <FlexColumn className="item">
            <TextTitle>{t('Max/Wallet')}</TextTitle>
            <TextPresent>2%</TextPresent>
          </FlexColumn>
          <FlexColumn className="item">
            <TextTitle>{t('Ine time max tx')}</TextTitle>
            <TextPresent>0.49%</TextPresent>
          </FlexColumn>
          <FlexColumn className="item">
            <TextTitle>{t('Min token balance for dividend')}</TextTitle>
            <TextPresent>10</TextPresent>
          </FlexColumn>
        </HuntTokenExtraDetails>
      </Page>
    </Background>
  )
}
const Background = styled.div`
  // width: 100%;
  // background-image: url('/images/assets/bg4.svg');
  // background-repeat: no-repeat;
  // background-position: top right;
`

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
  margin-bottom: 24px;
  font-weight: bold;
  flex-direction: column-reverse;
  gap: 20px;

  div {
    font-weight: bold;

    &:first-child {
      margin-right: 10px;
    }
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
  }
`

const Header = styled.div`
  color: #ffffff;
  font-weight: 700;
  font-style: normal;
  h1 {
    font-size: 64px;
    line-height: 140%;
    @media (max-width: 768px) {
      font-size: 40px;
    }
  }
  h6 {
    font-size: 20px;
    line-height: 180%;
    opacity: 0.7;
  }
`

const Title = styled(Text)`
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 15px;
`

const ValueText = styled(Text)`
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 140%;
  @media (max-width: 768px) {
    font-size: 18px;
  }
`

const BodyContent = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 64px;
  margin-bottom: 24px;

  .text {
    max-width: 90%;
    @media (max-width: 768px) {
      max-width: 100%;
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    margin-top: 36px;
  }
`
const TextSugar = styled(Text)`
  font-size: 12px;
  font-weight: 700;
  font-style: normal;
  line-height: 160%;
`

const TextSugarValue = styled(Text)`
  font-weight: 700;
  font-size: 16px;
`

const PriceAndSupply = styled(Flex)`
  flex-direction: row;
  margin-top: 64px;
  @media (max-width: 768px) {
    flex-direction: column;
    margin-top: 36px;
    border-radius: 8px;
    background: ${(props) => props.theme.card.background};
    border: 1px solid ${(props) => props.theme.card.background};

    .supply {
      box-sizing: border-box;
      display: flex;
      flex-flow: row wrap;
      padding: 16px;

      .supply-item {
        box-sizing: border-box;
        flex-basis: 50%;
        flex-shrink: 0;
        max-width: 50%;
        padding-bottom: 16px;
        &:last-child {
          padding-bottom: 0;
        }
      }
    }

    .price {
      box-sizing: border-box;
      display: flex;
      flex-flow: row wrap;
      padding: 16px;

      .price-item {
        margin-right: 0px;
        box-sizing: border-box;
        flex-basis: 50%;
        flex-shrink: 0;
        max-width: 50%;
        padding-bottom: 16px;
        &:last-child {
          padding-bottom: 0;
        }
      }
    }
  }
`

const BakeCard = styled(Flex)`
  flex: 1;
  background: ${(props) => props.theme.card.background};
  border-radius: 24px;
  border: 1px solid ${(props) => props.theme.card.background};
  padding: 24px;
  flex-direction: column;
  @media (max-width: 768px) {
    margin-top: 24px;
  }
`

const ButtonBold = styled(Button)`
  border-radius: 28px;
  width: 48%;
  background-color: #6951ff;
  opacity: 0.43;
  font-size: 14px;
`

const ButtonTransparent = styled(Button)`
  border-radius: 28px;
  width: 48%;
  background: ${(props) => props.theme.card.background};
  border: 1px solid ${(props) => props.theme.card.background};
  opacity: 0.43;
  font-size: 14px;
`

const HuntTokenExtraDetails = styled(Flex)`
  background: ${(props) => props.theme.card.background};
  border: 1px solid ${(props) => props.theme.card.background};
  border-radius: 8px;
  justify-content: space-between;
  padding: 16px;
  margin-top: 16px;

  @media (max-width: 768px) {
    box-sizing: border-box;
    display: flex;
    flex-flow: row wrap;

    .item {
      box-sizing: border-box;
      flex-basis: 50%;
      flex-shrink: 0;
      max-width: 50%;
      padding-bottom: 16px;
      &:last-child {
        padding-bottom: 0;
      }
    }

    margin-bottom: 24px;
  }
`

const TextTitle = styled(Text)`
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 15px;
`

const TextPresent = styled(Text)`
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 200%;
`

const TextValue = styled(Text)`
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 140%;
`

const FlexColumn = styled(Flex)`
  flex-direction: column;
`

export default HuntView
