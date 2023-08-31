import { useWeb3React } from '@web3-react/core'
import { Ifo } from 'config/constants/types'
import { useTranslation } from 'contexts/Localization'
import React from 'react'
import { useToast } from 'state/hooks'
import styled from 'styled-components'
import { AutoRenewIcon, Button, Flex, Text } from 'sugarswap-uikit'
import { getBalanceNumber } from 'utils/formatBalance'
import { Contract } from 'web3-eth-contract'
import { UserInfo, WalletIfoState } from '../../hooks/useGetWalletIfoData'

interface ClaimProps {
  ifo: Ifo
  contract: Contract
  userInfo: UserInfo
  isPendingTx: WalletIfoState['isPendingTx']
  setPendingTx: (status: boolean) => void
  offeringTokenBalance: WalletIfoState['offeringTokenBalance']
  refundingAmount: WalletIfoState['refundingAmount']
  setIsClaimed: () => void
  liquidityIsCreated: boolean
}

const BoldSugarText = styled(Text)`
  font-size: 12px;
  font-weight: 700;
  font-style: normal;
  line-height: 15px;
`

const BoldText = styled(Text)<{ fs?: string }>`
  font-weight: 700;
  font-size: ${(props) => (props.fs ? props.fs : '16px')};
  line-height: 160%;
  font-style: normal;
`

const TextNote = styled(Text)`
  font-size: 12px;
  font-weight: 500;
  font-style: normal;
  line-height: 160%;
  margin-top: 8px;
`

const FlexColumn = styled(Flex)`
  flex-direction: column;
  flex: 1;
`

const DISPLAY_DECIMALS = 4

const Claim: React.FC<ClaimProps> = ({
  ifo,
  contract,
  userInfo,
  isPendingTx,
  setPendingTx,
  offeringTokenBalance,
  refundingAmount,
  setIsClaimed,
  liquidityIsCreated,
}) => {
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const didContribute = userInfo.amount.gt(0)
  const canClaim = !userInfo.claimed
  const { tokenSymbol, tokenDecimals, currencyDecimals } = ifo
  const contributedBalance = getBalanceNumber(userInfo.amount, currencyDecimals)
  const refundedBalance = getBalanceNumber(refundingAmount, currencyDecimals).toFixed(
    userInfo.amount.eq(0) ? 0 : DISPLAY_DECIMALS,
  )
  const rewardBalance = getBalanceNumber(offeringTokenBalance, tokenDecimals)
  const { toastError, toastSuccess } = useToast()

  const handleClaim = async () => {
    try {
      setPendingTx(true)
      await contract.methods.harvest().send({ from: account })
      setIsClaimed()
      toastSuccess('Success!', 'You have successfully claimed your rewards.')
    } catch (error) {
      toastError('Error', error?.message)
      console.error(error)
    } finally {
      setPendingTx(false)
    }
  }

  const buttonLabel = () => {
    if (!liquidityIsCreated) {
      return t('Adding Liquidity...')
    }
    if (canClaim) {
      return t('Claim Tokens')
    }

    return t('Claimed')
  }

  return (
    <>
      <Flex>
        <FlexColumn>
          <BoldSugarText color="sugar">{t('Tokens Committed')}</BoldSugarText>
          <BoldText color={offeringTokenBalance.gt(0) ? 'text' : 'textDisabled'}>
            {contributedBalance.toFixed(userInfo.amount.eq(0) ? 0 : DISPLAY_DECIMALS)}
          </BoldText>
          <Text color="textSubtle" fontSize="14px" fontWeight={500} style={{ opacity: '0.7' }}>
            {canClaim ? `${refundedBalance} to reclaim` : `${refundedBalance} reclaimed`}
          </Text>
        </FlexColumn>

        <FlexColumn>
          <BoldSugarText color="sugar">{t('Tokens to claim')}</BoldSugarText>
          <BoldText color={offeringTokenBalance.gt(0) ? 'text' : 'textDisabled'}>
            {rewardBalance.toFixed(offeringTokenBalance.eq(0) ? 0 : DISPLAY_DECIMALS)}
          </BoldText>
        </FlexColumn>
      </Flex>

      <Flex flexDirection="column" alignItems="center" mt={16}>
        {didContribute ? (
          <Button
            onClick={handleClaim}
            disabled={isPendingTx || !canClaim || !liquidityIsCreated}
            width="100%"
            isLoading={isPendingTx}
            endIcon={isPendingTx ? <AutoRenewIcon spin color="currentColor" /> : null}
          >
            {buttonLabel()}
          </Button>
        ) : (
          <Button disabled width="100%">
            {t('Nothing to Claim')}
          </Button>
        )}

        {!liquidityIsCreated ? (
          <TextNote mt={16}>{t('Please wait until liquidity is created')}</TextNote>
        ) : (
          <TextNote mt={16}>{t('You’ll be refunded any excess tokens when you claim')}</TextNote>
        )}
      </Flex>
    </>
  )
}

export default Claim
