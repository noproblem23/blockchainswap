import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import Page from 'components/layout/Page'
import { useTranslation } from 'contexts/Localization'
import { useXsugarAllowance } from 'hooks/useAllowance'
import { useXsugarApprove } from 'hooks/useApprove'
import useSugarInfo, { useUserInfo, useXsugarStake, useXsugarUnstake } from 'hooks/useSugarInfo'
import useRefresh from 'hooks/useRefresh'
import orderBy from 'lodash/orderBy'
import partition from 'lodash/partition'
import React, { useEffect, useMemo, useState } from 'react'
import { Route, useRouteMatch } from 'react-router-dom'
import { useOneDayVolume, usePools, usePriceSugarUsd } from 'state/hooks'
import styled from 'styled-components'
import { BaseLayout, Button, Flex, Text, Toggle, useModal } from 'sugarswap-uikit'
import useTheme from '../../hooks/useTheme'
import FarmTabButtons from '../Farms/components/FarmTabButtons'
import PoolCard from './components/PoolCard'
import StakeModal from './components/xsugar/StakeModal'
import UnstakeModal from './components/xsugar/UnstakeModal'

const FlexLayout = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: -16px;
  margin-right: -16px;
  margin-top: 48px;

  & > * {
    min-width: 280px;
    max-width: 33.33%;
    width: 100%;
    margin-bottom: 32px;

    @media (max-width: 768px) {
      max-width: 100%;
    }

    ${({ theme }) => theme.mediaQueries.xl} {
      max-width: 25%;
      min-width: 180px;
      @media (max-width: 768px) {
        max-width: 100%;
      }
    }
  }

  @media (max-width: 768px) {
    margin-top: 36px;
  }
`

const Farm: React.FC = () => {
  const { path } = useRouteMatch()
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const pools = usePools(account)

  const [stackedOnly, setStackedOnly] = useState(false)
  const [update, setUpdate] = useState(false)
  const [timestamp, setTimestamp] = useState(0)
  const { fastRefresh } = useRefresh()

  const onApprove = useXsugarApprove()
  const allowance = useXsugarAllowance(update)
  const { totalLockedSugar, xsugarRatio, delayToWithdraw } = useSugarInfo()
  const sugarPrice = usePriceSugarUsd()
  const { sugarBalance, xsugarBalance, claimableAmount, stakedTime } = useUserInfo()
  const { onStake } = useXsugarStake()
  const { onUnstake } = useXsugarUnstake()
  const oneDayVolume = useOneDayVolume()
  const { isDark } = useTheme()

  useEffect(() => {
    setTimestamp(Math.floor(new Date().getTime() / 1000))
  }, [fastRefresh])

  const [finishedPools, openPools] = useMemo(
    () => partition(pools, (pool) => pool.isFinished || timestamp > pool.endTime),
    [timestamp, pools],
  )
  const stackedOnlyPools = useMemo(
    () => openPools.filter((pool) => pool.userData && new BigNumber(pool.userData.stakedBalance).isGreaterThan(0)),
    [openPools],
  )

  const [onPresentStake] = useModal(<StakeModal max={sugarBalance} onConfirm={onStake} />)
  const [onPresentUnstake] = useModal(
    <UnstakeModal max={xsugarBalance} onConfirm={onUnstake} deadline={stakedTime + delayToWithdraw} />,
  )

  const data = {
    maintainAspectRatio: false,
    responsive: false,
    datasets: [
      {
        data: [xsugarRatio, 1],
        backgroundColor: ['#ED952E', '#6F7A9A26'],
      },
    ],
  }

  const options = {
    legend: {
      display: false,
      position: 'right',
    },
    elements: {
      arc: {
        borderWidth: 0,
      },
    },
    cutoutPercentage: 90,
  }

  return (
    <Background>
      <Page>
        <Header>
          <h1>{t('Staking')}</h1>
          <h6>{t('Stake your SWEET to earn even more!')}</h6>
        </Header>
        <XsugarCallout>
          <StepOne>
            <StepCard>
              <Text color="sugar" fontSize="12px" style={{ fontStyle: 'normal', fontWeight: '700' }}>
                Step 1
              </Text>
              <Text fontSize="24px" style={{ fontStyle: 'normal', fontWeight: '700' }}>
                {t('Stake SWEET, Receive xSWEET Immediately')}
              </Text>
              <div className="style-text">
                <Text
                  color="text"
                  fontSize="14px"
                  mb="15px"
                  mt="24px"
                  style={{ fontWeight: '500', lineHeight: '200%' }}
                >
                  {t(
                    'Stake SUGAR here and receive xSUGAR as receipt representing your share of the pool. This pool automatically compounds by using a portion of all trade fees to buy back SUGAR which means the xSUGAR to SUGAR ratio will grow over time!',
                  )}
                </Text>
                <Text color="text" fontSize="12px" style={{ fontWeight: '500', lineHeight: '160%' }}>
                  {t(
                    '* There is a 4% withdraw fee if $xSUGAR is withdrawn to SUGAR within 3 days. 2% is burned and 2% is returned to the $xSUGAR contract.',
                  )}
                </Text>
              </div>
            </StepCard>
            <CardContainer>
              <div className="card-container">
                <Flex>
                  <Text fontSize="16px" fontWeight={700} fontStyle="normal" lineHeight="160%">
                    1 xSWEET&nbsp;
                  </Text>
                  <Text fontSize="16px" fontWeight={700} fontStyle="normal" lineHeight="160%" color="sugar">
                    =&nbsp;{xsugarRatio.toFormat(4)}
                  </Text>
                  <Text fontSize="16px" fontWeight={700} fontStyle="normal" lineHeight="160%">
                    &nbsp;SWEET
                  </Text>
                </Flex>
                <Flex>
                  <Flex alignItems="center" flex={1}>
                    <Text color="textSubtle" fontSize="14px" fontWeight={500} style={{ opacity: '0.7' }}>
                      {t('Approximate APR')}:&nbsp;
                    </Text>
                    <Text fontWeight="bold">
                      {totalLockedSugar.isZero()
                        ? 0
                        : new BigNumber(oneDayVolume.oneDayVolumeUSD)
                            .times(0.001)
                            .times(365)
                            .div(totalLockedSugar.times(sugarPrice))
                            .times(100)
                            .toFormat(2)}
                      %
                    </Text>
                  </Flex>
                  <Flex alignItems="center" flex={1}>
                    <Text color="textSubtle" fontSize="14px" fontWeight={500} style={{ opacity: '0.7' }}>
                      TVL:&nbsp;
                    </Text>
                    <Text fontWeight="bold">${totalLockedSugar.times(sugarPrice).toFormat(2)}</Text>
                  </Flex>
                </Flex>
                <Flex justifyContent="space-between" alignItems="center" marginTop="24px">
                  <Flex flexDirection="column">
                    <Text fontSize="12px" fontWeight={700} fontStyle="normal" lineHeight="160%" color="sugar">
                      {t('Claimable')}
                    </Text>
                    <Text fontWeight={700} fontSize="16x">
                      {claimableAmount.toFormat(2)} BAKE
                    </Text>
                    <Flex alignItems="center">
                      <Text color="textSubtle" fontSize="14px" fontWeight={500} style={{ opacity: '0.7' }}>
                        {t('Total Claimed')}:&nbsp;
                      </Text>
                      <Text fontWeight="bold">${claimableAmount.times(sugarPrice).toFormat(2)}</Text>
                    </Flex>
                  </Flex>
                  <StyledButton>{t('Harvest')}</StyledButton>
                </Flex>
              </div>
            </CardContainer>
          </StepOne>
          <StepTow>
            <StepFlex>
              <div>
                <Text color="sugar" fontSize="12px" style={{ fontStyle: 'normal', fontWeight: '700' }}>
                  Step 2
                </Text>
                <Text fontSize="24px" style={{ fontStyle: 'normal', fontWeight: '700' }}>
                  {t('Stake xSUGAR, Earn Tokens of Your Choice Over Time')}
                </Text>
              </div>
              <ViewControls>
                <FarmTabButtons />
                <ToggleWrapper>
                  <Toggle checked={stackedOnly} onChange={() => setStackedOnly(!stackedOnly)} scale="sm" />
                  <Text color="textSubtle" style={{ fontWeight: 700, fontSize: '12px', lineHeight: '200%' }}>
                    {t('Staked only')}
                  </Text>
                </ToggleWrapper>
              </ViewControls>
            </StepFlex>
            <FlexLayout>
              <Route exact path={`${path}`}>
                <>
                  {stackedOnly
                    ? orderBy(stackedOnlyPools, ['sortOrder']).map((pool) => <PoolCard key={pool.sousId} pool={pool} />)
                    : orderBy(openPools, ['sortOrder']).map((pool) => <PoolCard key={pool.sousId} pool={pool} />)}
                </>
              </Route>
              <Route path={`${path}/history`}>
                {orderBy(finishedPools, ['sortOrder'])
                  .map((item) => {
                    return {
                      ...item,
                      isFinished: item.isFinished || timestamp > item.endTime,
                    }
                  })
                  .map((pool) => (
                    <PoolCard key={pool.sousId} pool={pool} />
                  ))}
              </Route>
            </FlexLayout>
          </StepTow>
        </XsugarCallout>
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

const CardContainer = styled.div`
  display: flex;
  flex: 4;
  align-items: center;
  .card-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    background: ${(props) => props.theme.card.background};
    height: auto;
    border-radius: 24px;
    padding: 24px;
    height: 80%;
    .exchange {
      display: flex;
      flex-direction: row;
    }
  }

  @media (max-width: 768px) {
    margin-top: 24px;
  }
`

const StepOne = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 48px;
  @media (max-width: 768px) {
    flex-direction: column;
    margin-top: 36px;
  }
`

const XsugarCallout = styled(BaseLayout)`
  display: flex;
  flex-direction: column;
`

const StepTow = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 24px;
`

const StyledButton = styled(Button)`
  border-radius: 28px;
  width: 150px;
  background-color: #6951ff;
  opacity: 0.43;
  height: 44px;
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

const StepCard = styled.div`
  display: flex;
  flex: 6;
  flex-direction: column;
  .style-text {
    max-width: 60%;
    @media (max-width: 768px) {
      max-width: 100%;
    }
  }
`

const StepFlex = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

const ViewControls = styled.div`
  flex-wrap: wrap;
  justify-content: space-between;
  display: flex;
  align-items: center;
  width: 100%;

  > div {
    padding: 8px 0px;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    justify-content: flex-start;
    width: auto;

    > div {
      padding: 0;
    }
  }
`

const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;

  ${Text} {
    margin-left: 8px;
  }
`

export default Farm
