import BigNumber from 'bignumber.js'
import UnlockButton from 'components/UnlockButton'
import HomePage from 'components/layout/HomePage'
import { useTranslation } from 'contexts/Localization'
import { useGetStats, useTokensData } from 'hooks/api'
import useFarmsWithBalance from 'hooks/useFarmsWithBalance'
import { useAllHarvest } from 'hooks/useHarvest'
import useSugarInfo from 'hooks/useSugarInfo'
import { useBurnedBalance, useCirculatingBalance, usePairsLength } from 'hooks/useTokenBalance'
import React, { useCallback, useMemo, useState } from 'react'
import { useFarms, useGetApiPrices, useOneDayVolume, usePools, usePriceSugarUsd } from 'state/hooks'
import styled from 'styled-components'
import { Button, Skeleton, Text, useMatchBreakpoints } from 'sugarswap-uikit'
import { getSugarAddress } from 'utils/addressHelpers'
import { getBalanceNumber } from 'utils/formatBalance'

import { useWeb3React } from '@web3-react/core'

import CardValue from './components/CardValue'

const Background = styled.div`
  width: 100%;
  position: relative;
  overflow: hidden;
  .description {
    color: #ffffff;
    max-width: 50%;
    h2 {
      font-style: normal;
      font-weight: 700;
      font-size: 64px;
      line-height: 140%;
    }
    h6 {
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 1.75;
      width: 80%;
    }
  }
  @media (max-width: 767px) {
    padding: 32px 16px;
    .description {
      max-width: 100%;
      text-align: center;
      h6 {
        width: 100%;
      }
    }
  }

  @media (max-width: 375px) {
    padding: 32px 16px;
    .description {
      margin-top: -48px;
      h2 {
        font-size: 36px;
      }
    }
  }
`

const ImagePosition = styled.div`
  position: absolute;
  right: 0;
  top: -16px;
  width: 60%;
  object-fit: cover;
  display: flex;
  justify-content: end;
  .img {
  }
  @media (max-width: 767px) {
    top: 0px;
    left: 20%;
  }

  @media (max-width: 375px) {
    top: 0px;
    justify-content: center;
    .img {
      width: 80%;
      height: 80%;
    }
  }
`

const HomeFooter = styled.div`
  position: absolute;
  z-index: 1;
  bottom: 32px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;

  .item {
    display: flex;
    flex-direction: column;
    color: #ffffff;
    .title {
      font-style: normal;
      font-weight: 700;
      font-size: 12px;
      line-height: 15px;
    }
    .value {
      font-style: normal;
      font-weight: 700;
      font-size: 24px;
      line-height: 29px;
    }
  }
  @media (max-width: 767px) {
    flex-wrap: wrap;
    justify-content: flex-start;
    left: 0px;
    bottom: 50px;

    .item {
      display: inline-flex;
      flex-direction: column;
      margin: 0px 10px 20px 0px;
      h4 {
        margin-bottom: 5px;
      }
      .value {
        font-size: 16px;
        line-height: 18px;
      }
    }
  }

  @media (max-width: 375px) {
    flex-wrap: wrap;
    justify-content: flex-start;
    left: 0;
    bottom: 16px;

    .item {
      display: inline-flex;
      flex-direction: column;
      margin: 0px 10px 20px 0px;
      h4 {
        margin-bottom: 5px;
      }
      .value {
        font-size: 16px;
        line-height: 18px;
      }
    }
  }
`

const StyledButton = styled(Button)`
  border-radius: 16px;
`

const StyledUnlockButton = styled(UnlockButton)`
  color: #ffffff;
  width: 160px;
  margin-top: 29px;
  border-radius: 28px;
`

const Home: React.FC = () => {
  const { t } = useTranslation()
  const [pendingTx, setPendingTx] = useState(false)
  const burnedBalance = useBurnedBalance(getSugarAddress())
  const { isXl } = useMatchBreakpoints()
  const circulatingBalance = useCirculatingBalance()
  const sugarPriceUsd = usePriceSugarUsd()
  const data = useGetStats()
  const farms = useFarms()
  const prices = useGetApiPrices()
  const { account } = useWeb3React()
  const pools = usePools(account)
  const oneDayVolume = useOneDayVolume()
  const pairsLength = usePairsLength()
  const tokenslength = useTokensData()
  const { totalLockedSugar } = useSugarInfo()
  const farmsWithBalance = useFarmsWithBalance()
  const balancesWithValue = farmsWithBalance.filter((balanceType) => balanceType.balance.toNumber() > 0)

  const isMobile = !isXl

  const { onReward } = useAllHarvest(balancesWithValue.map((farmWithBalance) => farmWithBalance.pid))

  const tvl = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const farmTVL = farms.reduce((accum, farm) => {
      if (!farm.lpTotalInQuoteToken || !prices) {
        return accum
      }

      const quoteTokenPriceUsd = prices[farm.quoteToken.symbol.toLowerCase()]
      const liquidity = new BigNumber(farm.lpTotalInQuoteToken).times(quoteTokenPriceUsd)
      return accum.plus(liquidity)
    }, new BigNumber(0))

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const poolTVL = pools.reduce((accum, pool) => {
      if (!pool) {
        return accum
      }

      const stakingTokenPriceUsd = prices[pool.stakingToken.symbol.toLowerCase()]
      const liquidity = new BigNumber(pool.totalStaked)
        .div(new BigNumber(10).pow(pool.stakingToken.decimals))
        .times(stakingTokenPriceUsd)
      return accum.plus(liquidity)
    }, new BigNumber(0))

    const pairTVL = new BigNumber(data ? data.total_value_locked_all : 0)

    const xsugarTVL = totalLockedSugar.times(prices.sugar)

    // const totalTVL = farmTVL.plus(poolTVL).plus(pairTVL).plus(xsugarTVL)
    const totalTVL = pairTVL.plus(xsugarTVL)

    return totalTVL.toNumber().toLocaleString('en-US', { maximumFractionDigits: 0 })
  }, [data, farms, pools, prices, totalLockedSugar])

  const harvestAllFarms = useCallback(async () => {
    setPendingTx(true)
    try {
      await onReward()
    } catch (error) {
      // TODO: find a way to handle when the user rejects transaction or it fails
    } finally {
      setPendingTx(false)
    }
  }, [onReward])

  return (
    <Background>
      <HomePage>
        <div className="description">
          <h2>{t('Sweet AF')}</h2>
          <h6>
            {t(
              'SugarSwap is a crypto world for users to trade, earn, and game. It is the premier choice for projects on ZkSync Era with features including AMM, NFT, and GameFi.',
            )}
          </h6>
          {account ? (
            <StyledButton
              id="harvest-all"
              disabled={balancesWithValue.length <= 0 || pendingTx}
              onClick={harvestAllFarms}
              width="100%"
            >
              {pendingTx
                ? t('Connect Wallet')
                : t(`Harvest all (%count%)`, {
                    count: balancesWithValue.length,
                  })}
            </StyledButton>
          ) : (
            <StyledUnlockButton width="100%" />
          )}
        </div>
        <HomeFooter>
          <div className="item">
            <h4 className="title">{t('Price')}</h4>
            <CardValue className="value" decimals={3} value={sugarPriceUsd.toNumber()} />
          </div>
          <div className="item">
            <h4 className="title">{t('Market Cap')}</h4>
            <CardValue
              className="value"
              decimals={0}
              value={new BigNumber(circulatingBalance).div(1e18).times(sugarPriceUsd).toNumber()}
            />
          </div>
          <div className="item">
            <h4 className="title">{t('Circulation')}</h4>
            <CardValue className="value" value={getBalanceNumber(circulatingBalance)} />
          </div>
          <div className="item">
            <h4 className="title">{t('Burned')}</h4>
            <CardValue className="value" decimals={0} value={getBalanceNumber(burnedBalance)} />
          </div>
          <div className="item">
            <h4 className="title">{t('24h Trading Volume')}</h4>
            {data ? (
              <>
                <Text className="value" color="text">
                  ${oneDayVolume.oneDayVolumeUSD.toLocaleString('en-US', { maximumFractionDigits: 3 })}
                </Text>
              </>
            ) : (
              <>
                <Skeleton height={isMobile ? 28 : 50} />
              </>
            )}
          </div>
          <div className="item">
            <h4 className="title">{t('Total Valued Locked (TVL)')}</h4>
            {data ? (
              <>
                <Text className="value" color="text">{`$${tvl}`}</Text>
              </>
            ) : (
              <>
                <Skeleton height={isMobile ? 28 : 50} />
              </>
            )}
          </div>
          <div className="item">
            <h4 className="title">{t('Coins')}</h4>
            <Text className="value" color="text" textAlign="right">
              {tokenslength}
            </Text>
          </div>
          <div className="item">
            <h4 className="title">{t('Pairs')}</h4>
            <Text className="value" color="text" textAlign="right">
              {pairsLength}
            </Text>
          </div>
        </HomeFooter>
      </HomePage>
      <ImagePosition>
        <img src="/images/home/logo.png" alt="home logo" className="img" />
      </ImagePosition>
    </Background>
  )
}

export default Home
