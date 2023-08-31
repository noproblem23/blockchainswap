import UnlockButton from 'components/UnlockButton'
import { useTranslation } from 'contexts/Localization'
import { useApprove } from 'hooks/useApprove'
import useWeb3 from 'hooks/useWeb3'
import React, { useCallback, useState } from 'react'
import { useFarmFromSymbol, useFarmUser } from 'state/hooks'
import { FarmWithStakedValue } from 'state/types'
import styled from 'styled-components'
import { Button, Flex, Text } from 'sugarswap-uikit'
import { getAddress } from 'utils/addressHelpers'
import { getBep20Contract } from 'utils/contractHelpers'
import { provider as ProviderType } from 'web3-core'

import HarvestAction from './HarvestAction'
import StakeAction from './StakeAction'

const Action = styled.div`
  padding: 16px 24px 0;
`
const StyledUnlockButton = styled(UnlockButton)`
  color: #ffffff;
  width: 100%;
`
const StyledButton = styled(Button)`
  color: #ffffff;
`

const StyledText = styled.h3`
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 15px;
  color: #6951ff;
`

interface FarmCardActionsProps {
  farm: FarmWithStakedValue
  provider?: ProviderType
  account?: string
  addLiquidityUrl?: string
}

const CardActions: React.FC<FarmCardActionsProps> = ({ farm, account, addLiquidityUrl }) => {
  const { t } = useTranslation()
  const [requestedApproval, setRequestedApproval] = useState(false)
  const { pid, lpAddresses } = useFarmFromSymbol(farm.lpSymbol)
  const { allowance, tokenBalance, stakedBalance, earnings } = useFarmUser(pid)
  const lpAddress = getAddress(lpAddresses)
  const lpName = farm.lpSymbol
  const isApproved = account && allowance && allowance.isGreaterThan(0)
  const web3 = useWeb3()

  const lpContract = getBep20Contract(lpAddress, web3)

  const { onApprove } = useApprove(lpContract)

  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      await onApprove()
      setRequestedApproval(false)
    } catch (e) {
      console.error(e)
    }
  }, [onApprove])

  const renderApprovalOrStakeButton = () => {
    return isApproved ? (
      <StakeAction
        stakedBalance={stakedBalance}
        tokenBalance={tokenBalance}
        tokenName={lpName}
        pid={pid}
        addLiquidityUrl={addLiquidityUrl}
      />
    ) : (
      <StyledButton mt="8px" width="100%" disabled={requestedApproval} onClick={handleApprove}>
        {t('Approve Contract')}
      </StyledButton>
    )
  }

  return (
    <Action>
      <HarvestAction earnings={earnings} pid={pid} />
      <Flex>
        <StyledText>{t('LP STAKED')}</StyledText>
      </Flex>
      {!account ? <StyledUnlockButton mt="8px" width="100%" /> : renderApprovalOrStakeButton()}
    </Action>
  )
}

export default CardActions
