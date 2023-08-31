import React from 'react'
import { Card, CardBody, Text, Flex } from 'sugarswap-uikit'
import styled from 'styled-components'
import { getBalanceNumber } from 'utils/formatBalance'
import useTheme from 'hooks/useTheme'
import { useBurnedBalance, useCirculatingBalance } from 'hooks/useTokenBalance'
import { useTranslation } from 'contexts/Localization'
import { getSugarAddress } from 'utils/addressHelpers'
import { usePriceSugarUsd } from 'state/hooks'
import BigNumber from 'bignumber.js'
import CardValue from './CardValue'

const StyledSugarStats = styled(Card)<any>`
  background: ${({ theme, isDark }) => (isDark ? theme.card.background : '#fff')};
  box-shadow: ${({ theme, isDark }) =>
    isDark ? '0px 3.5px 10px rgba(134, 145, 172, 0.1)' : '0px 3.5px 10px rgba(10, 14, 22, 0.1)'};
  border-radius: 16px;
  border: ${({ theme, isDark }) => (isDark ? '1px solid #29292D' : '0px solid')};
`

const LeftBlock = styled.div`
  margin-bottom: 16px;
`
const RightBlock = styled.div`
  margin-bottom: 16px;
  text-align: right;
`
// const CardImage = styled.img`
//   margin-bottom: 16px;
// `

const CakeStats = () => {
  const { t } = useTranslation()
  const burnedBalance = useBurnedBalance(getSugarAddress())
  const circulatingBalance = useCirculatingBalance()
  const { isDark } = useTheme()
  const sugarPriceUsd = usePriceSugarUsd()

  return (
    <StyledSugarStats isDark={isDark}>
      <CardBody>
        <Flex justifyContent="space-between">
          <LeftBlock>
            <Text fontSize="14px" color="title">
              {t('SUGAR Price')}
            </Text>
            <CardValue fontSize="24px" decimals={3} value={sugarPriceUsd.toNumber()} />
          </LeftBlock>
          <RightBlock>
            <Text fontSize="14px" color="title">
              {t('SUGAR Market Cap')}
            </Text>
            <CardValue
              fontSize="24px"
              decimals={0}
              value={new BigNumber(circulatingBalance).div(1e18).times(sugarPriceUsd).toNumber()}
            />
          </RightBlock>
        </Flex>
        <Flex justifyContent="space-between">
          <LeftBlock>
            <Text fontSize="14px" color="title">
              {t('SUGAR in Circulation')}
            </Text>
            <CardValue fontSize="24px" value={getBalanceNumber(circulatingBalance)} />
          </LeftBlock>

          <RightBlock>
            <Text fontSize="14px" color="title">
              {t('SUGAR Burned')}
            </Text>
            <CardValue fontSize="24px" decimals={0} value={getBalanceNumber(burnedBalance)} />
          </RightBlock>
        </Flex>
      </CardBody>
    </StyledSugarStats>
  )
}

export default CakeStats
