import React, { useMemo } from 'react'
import styled from 'styled-components'
import { Card, CardBody, Skeleton, Text, Flex } from 'sugarswap-uikit'
import useTheme from 'hooks/useTheme'
import { useTranslation } from 'contexts/Localization'
import { useGetStats, useTokensData } from 'hooks/api'
import { useFarms, useGetApiPrices, usePools, useOneDayVolume } from 'state/hooks'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { usePairsLength } from 'hooks/useTokenBalance'
import useSugarInfo from 'hooks/useSugarInfo'

const StyledTotalValueLockedCard = styled(Card)<any>`
  background: ${({ theme, isDark }) => (isDark ? theme.card.background : '#fff')};
  box-shadow: ${({ theme, isDark }) =>
    isDark ? '0px 3.5px 10px rgba(134, 145, 172, 0.1)' : '0px 3.5px 10px rgba(10, 14, 22, 0.1)'};
  border-radius: 16px;
  border: ${({ theme, isDark }) => (isDark ? '1px solid #29292D' : '0px solid')};
`
const Block = styled.div``
// const StyledCardBody = styled(CardBody)`
//   padding-left: 14px;
//   padding-right: 14px;
// `

const TotalValueLockedCard = () => {
  const { t } = useTranslation()
  const data = useGetStats()
  const farms = useFarms()
  const prices = useGetApiPrices()
  const { account } = useWeb3React()
  const pools = usePools(account)
  const { isDark } = useTheme()
  const oneDayVolume = useOneDayVolume()
  const pairsLength = usePairsLength()
  const tokenslength = useTokensData()
  const { totalLockedSugar } = useSugarInfo()

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

  return (
    <StyledTotalValueLockedCard isDark={isDark}>
      <CardBody>
        <Flex justifyContent="space-between">
          <Block>
            <Text fontSize="14px" color="title">
              {t('24h Trading Volume')}
              <br />
            </Text>
            {data ? (
              <>
                <Text fontSize="24px" fontWeight={600} color="text">
                  ${oneDayVolume.oneDayVolumeUSD.toLocaleString('en-US', { maximumFractionDigits: 3 })}
                </Text>
              </>
            ) : (
              <>
                <Skeleton height={50} />
              </>
            )}
          </Block>

          <Block>
            <Text fontSize="14px" color="title" textAlign="right">
              {t('Coins')}
            </Text>

            <Text fontSize="24px" fontWeight={600} color="text" textAlign="right">
              {tokenslength}
            </Text>
          </Block>
        </Flex>

        <Flex justifyContent="space-between">
          <Block>
            <Text fontSize="14px" color="title">
              {t('Total Valued Locked (TVL)')}
              <br />
            </Text>
            {data ? (
              <>
                <Text fontSize="24px" fontWeight={600} color="text">{`$${tvl}`}</Text>
              </>
            ) : (
              <>
                <Skeleton height={50} />
              </>
            )}
          </Block>

          <Block>
            <Text fontSize="14px" color="title" textAlign="right">
              {t('Pairs')}
            </Text>
            <Text fontSize="24px" fontWeight={600} color="text" textAlign="right">
              {pairsLength}
            </Text>
          </Block>
        </Flex>
      </CardBody>
    </StyledTotalValueLockedCard>
  )
}

export default TotalValueLockedCard
