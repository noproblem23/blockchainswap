import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import { useTranslation } from 'contexts/Localization'
import { useHarvest } from 'hooks/useHarvest'
import React, { useState } from 'react'
import styled from 'styled-components'
import { Button, Flex, Heading } from 'sugarswap-uikit'
import { getBalanceNumber } from 'utils/formatBalance'

const StyledText = styled.h3`
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 15px;
  color: #6951ff;
`

interface FarmCardActionsProps {
  earnings?: BigNumber
  pid?: number
}

const HarvestAction: React.FC<FarmCardActionsProps> = ({ earnings, pid }) => {
  const { account } = useWeb3React()
  const { t } = useTranslation()
  const [pendingTx, setPendingTx] = useState(false)
  const { onReward } = useHarvest(pid)

  const rawEarningsBalance = account ? getBalanceNumber(earnings) : 0
  const displayBalance = rawEarningsBalance.toLocaleString()

  return (
    <Flex mb="24px" justifyContent="space-between" alignItems="center">
      <Flex flexDirection="column" alignItems="start">
        <StyledText>{t('SWEET EARNED')}</StyledText>
        <Heading color={rawEarningsBalance === 0 ? 'textDisabled' : 'text'} fontWeight={700}>
          {displayBalance}
        </Heading>
      </Flex>
      <Button
        disabled={rawEarningsBalance === 0 || pendingTx}
        onClick={async () => {
          setPendingTx(true)
          await onReward()
          setPendingTx(false)
        }}
        style={{ width: '100px', height: '44px' }}
      >
        {t('Harvest')}
      </Button>
    </Flex>
  )
}

export default HarvestAction
