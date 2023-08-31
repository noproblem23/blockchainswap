import React from 'react'
import { useTotalClaim } from 'hooks/useTickets'
import { getBalanceNumber } from 'utils/formatBalance'
import { usePriceSugarUsd } from 'state/hooks'
import { BigNumber } from 'bignumber.js'
import styled from 'styled-components'
import CardValue from './CardValue'
import CardBusdValue from './CardBusdValue'

const Block = styled.div`
  margin-bottom: 24px;
 }
`
const CakeWinnings = () => {
  const { claimAmount } = useTotalClaim()
  const sugarAmount = getBalanceNumber(claimAmount)
  const claimAmountBusd = new BigNumber(sugarAmount).multipliedBy(usePriceSugarUsd()).toNumber()

  return (
    <Block>
      <CardValue value={sugarAmount} lineHeight="1.5" />
      <CardBusdValue value={claimAmountBusd} decimals={2} />
    </Block>
  )
}

export default CakeWinnings
