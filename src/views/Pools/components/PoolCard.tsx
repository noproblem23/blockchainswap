import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import Balance from 'components/Balance'
import { PoolCategory } from 'config/constants/types'
import { useTranslation } from 'contexts/Localization'
import { useSousApprove } from 'hooks/useApprove'
import { useERC20 } from 'hooks/useContract'
import { useSousHarvest } from 'hooks/useHarvest'
import { useSousStake } from 'hooks/useStake'
import { useSousUnstake } from 'hooks/useUnstake'
import React, { useCallback, useMemo, useState } from 'react'
import styled from 'styled-components'
import { Button, Flex, Image, useModal } from 'sugarswap-uikit'
import { getAddress } from 'utils/addressHelpers'
import { getPoolApy } from 'utils/apy'
import { getBalanceNumber } from 'utils/formatBalance'
// import tokens from 'config/constants/tokens'
import { useGetApiPrice } from 'state/hooks'
import { Pool } from 'state/types'
import DepositModal from './DepositModal'
import WithdrawModal from './WithdrawModal'
// import CompoundModal from './CompoundModal'
import Card from './Card'
import CardTitle from './CardTitle'
// import OldSyrupTitle from './OldSyrupTitle'
import CardFooter from './CardFooter'

const StyledText = styled.h3`
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 15px;
  color: #6951ff;
`

const CardWrapper = styled.div`
  padding: 0px 16px;
`

interface HarvestProps {
  pool: Pool
}

const PoolCard: React.FC<HarvestProps> = ({ pool }) => {
  const {
    sousId,
    stakingToken,
    earningToken,
    harvest,
    poolCategory,
    totalStaked,
    startTime,
    endTime,
    isFinished,
    userData,
    stakingLimit,
    // depositFee,
  } = pool

  // Pools using native CORE behave differently than pools using a token
  const isCorePool = poolCategory === PoolCategory.CORE
  const { t } = useTranslation()
  const stakingTokenContract = useERC20(stakingToken.address ? getAddress(stakingToken.address) : '')
  const { account } = useWeb3React()
  const { onApprove } = useSousApprove(stakingTokenContract, sousId)
  const { onStake } = useSousStake(sousId, isCorePool)
  const { onUnstake } = useSousUnstake(sousId)
  const { onReward } = useSousHarvest(sousId, isCorePool)

  // APY
  const rewardTokenPrice = useGetApiPrice(earningToken.symbol) // Calculate sugar
  const stakingTokenPrice = useGetApiPrice(stakingToken.symbol)
  const apy = getPoolApy(
    stakingTokenPrice,
    rewardTokenPrice,
    getBalanceNumber(pool.totalStaked, stakingToken.decimals),
    parseFloat(pool.tokenPerSecond),
  )
  const [requestedApproval, setRequestedApproval] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [pendingTx, setPendingTx] = useState(false)

  const allowance = new BigNumber(userData?.allowance || 0)
  const stakingTokenBalance = new BigNumber(userData?.stakingTokenBalance || 0)
  const stakedBalance = new BigNumber(userData?.stakedBalance || 0)
  const earnings = new BigNumber(userData?.pendingReward || 0)

  const accountHasStakedBalance = stakedBalance?.toNumber() > 0
  const needsApproval = !accountHasStakedBalance && !allowance.toNumber() // && !isCorePool
  const isCardActive = isFinished && accountHasStakedBalance

  const rawEarningsBalance = account ? getBalanceNumber(earnings) : 0
  const displayBalance = rawEarningsBalance.toLocaleString()

  const convertedLimit = new BigNumber(stakingLimit).multipliedBy(new BigNumber(10).pow(earningToken.decimals))
  const [onPresentDeposit] = useModal(
    <DepositModal
      max={stakingLimit && stakingTokenBalance.isGreaterThan(convertedLimit) ? convertedLimit : stakingTokenBalance}
      onConfirm={onStake}
      tokenName={stakingLimit ? `${stakingToken.symbol} (${stakingLimit} max)` : stakingToken.symbol}
      stakingTokenDecimals={stakingToken.decimals}
    />,
  )

  // const [onPresentCompound] = useModal(
  //   <CompoundModal earnings={earnings} onConfirm={onStake} tokenName={stakingToken.symbol} />,
  // )
  // const poolImage = `${pool.earningToken.symbol}-${pool.stakingToken.symbol}.svg`.toLocaleLowerCase()
  const [onPresentWithdraw] = useModal(
    <WithdrawModal
      max={stakedBalance}
      onConfirm={onUnstake}
      tokenName={stakingToken.symbol}
      stakingTokenDecimals={stakingToken.decimals}
    />,
  )

  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      const txHash = await onApprove()
      // user rejected tx or didn't go thru
      if (!txHash) {
        setRequestedApproval(false)
      }
    } catch (e) {
      console.error(e)
    }
  }, [onApprove, setRequestedApproval])

  const symbol = useMemo(() => {
    return [
      /* 19, 1, 2, 15 */
    ].includes(sousId)
      ? stakingToken.symbol
      : earningToken.symbol
  }, [stakingToken, earningToken, sousId])

  const poolName = useMemo(() => {
    if ([8].includes(sousId)) {
      return `${stakingToken.symbol}/${earningToken.symbol}`
    }
    return symbol
  }, [stakingToken, earningToken, sousId, symbol])

  return (
    <CardWrapper>
      <Card style={{ borderRadius: 24, width: '100%' }} isActive={isCardActive} isFinished={isFinished && sousId !== 0}>
        {isFinished && sousId !== 0 && <PoolFinishedSash />}
        <div style={{ padding: '24px 16px', paddingBottom: 8 }}>
          <CardHeading>
            <Image src={`/images/pools/${symbol}.png`} alt={symbol} width={24} height={24} />
            <CardTitle isFinished={isFinished && sousId !== 0}>
              {poolName} {t('Pool')}
            </CardTitle>
          </CardHeading>
          <StyledDetails>
            <div>{t('APR')}:</div>
            {isFinished || !apy ? (
              '-'
            ) : (
              <Balance fontSize="14px" isDisabled={isFinished} value={apy} decimals={2} unit="%" />
            )}
          </StyledDetails>
          <BalanceAndCompound>
            <Flex flexDirection="column" alignItems="start">
              <StyledText>
                {poolName} {t('EARNED')}
              </StyledText>
              <Balance
                color="primary"
                fontSize="16px"
                value={getBalanceNumber(earnings, earningToken.decimals)}
                isDisabled={isFinished}
              />
              <StyledDetails>
                <span style={{ fontSize: '12px', lineHeight: '160%', color: '#ffffff' }}>{t('Your Stake')}:&nbsp;</span>
                <Balance
                  fontSize="12px"
                  isDisabled={isFinished}
                  value={getBalanceNumber(stakedBalance, stakingToken.decimals)}
                />
              </StyledDetails>
            </Flex>
            <Flex>
              <Button variant="success" style={{ width: '100px', height: '44px' }}>
                {t('Harvest')}
              </Button>
            </Flex>
          </BalanceAndCompound>
        </div>

        <CardFooter
          projectLink={earningToken.projectLink}
          decimals={stakingToken.decimals}
          totalStaked={totalStaked}
          startTime={startTime}
          endTime={endTime}
          isFinished={isFinished}
          poolCategory={poolCategory}
          tokenName={earningToken.symbol}
          tokenAddress={earningToken.address ? getAddress(earningToken.address) : ''}
          tokenDecimals={earningToken.decimals}
        />
      </Card>
    </CardWrapper>
  )
}

const PoolFinishedSash = styled.div`
  background-image: url('/images/pool-finished-sash.svg');
  background-position: top right;
  background-repeat: no-repeat;
  height: 135px;
  position: absolute;
  right: -24px;
  top: -24px;
  width: 135px;
`

const CardHeading = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const BalanceAndCompound = styled.div`
  margin-top: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
`

const StyledDetails = styled.div`
  display: flex;
  color: ${({ theme }) => theme.colors.textDisabled};
  align-items: center;
  font-size: 14px;
  font-weight: 500;
`

export default PoolCard
