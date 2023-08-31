import React, { useEffect, useState, useCallback } from 'react'
import styled from 'styled-components'
import { Button, LinkExternal, useModal } from 'sugarswap-uikit'
import { useTranslation } from 'contexts/Localization'
import { useWeb3React } from '@web3-react/core'
import useClaimReward from 'hooks/useClaimReward'
import { fetchLotteryTicketData } from 'utils/fetchLotteryData'
import UnlockButton from 'components/UnlockButton'
import MyTicketsModal from '../TicketCard/UserTicketsModal'

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  padding-top: 24px;

  & > div {
    flex: 1;
    width: 100%;
  }
`
const CardActions = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${(props) => props.theme.spacing[3]}px;

  ${({ theme }) => theme.mediaQueries.lg} {
    justify-content: space-between;
  }
`

const ExternalLinkWrap = styled(LinkExternal)`
  align-items: center;
  display: flex;
  height: 48px;
  justify-content: center;
  text-decoration: none;
  width: 100%;
`

const TicketCard: React.FC<{ contractLink?: string; lotteryNumber?: number }> = ({ contractLink, lotteryNumber }) => {
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const [rewardTicketIds, setRewardTicketIds] = useState([])
  const [lotteryTicketData, setLotteryTicketData] = useState(null)
  const [requestedClaim, setRequestedClaim] = useState(false)
  const { onClaimReward } = useClaimReward(lotteryNumber)

  useEffect(() => {
    const fetchLotteryData = async () => {
      try {
        const data = await fetchLotteryTicketData(account, lotteryNumber)
        setLotteryTicketData(data)
      } catch (err) {
        setLotteryTicketData(null)
      }
    }
    if (lotteryNumber > 0) {
      fetchLotteryData()
    }
  }, [lotteryNumber, account, setLotteryTicketData])

  useEffect(() => {
    if (lotteryTicketData && lotteryTicketData.length > 0) {
      const tempRewardTicketIds = []

      for (let i = 0; i < lotteryTicketData.length; i++) {
        if (lotteryTicketData[i].ticketReward.gt(0) && !lotteryTicketData[i].ticketClaim)
          tempRewardTicketIds.push(lotteryTicketData[i].ticketNo)
      }

      setRewardTicketIds(tempRewardTicketIds)
    } else {
      setRewardTicketIds([])
    }
  }, [lotteryTicketData, setRewardTicketIds])

  const handleClaim = useCallback(async () => {
    try {
      setRequestedClaim(true)
      const txHash = await onClaimReward(rewardTicketIds)
      // user rejected tx or didn't go thru
      if (txHash) {
        setRequestedClaim(false)
      }
    } catch (e) {
      console.error(e)
    } finally {
      setRequestedClaim(false)
    }
  }, [onClaimReward, setRequestedClaim, rewardTicketIds])

  const [onPresentMyTickets] = useModal(
    <MyTicketsModal myTicketNumbers={lotteryTicketData} lotteryNo={lotteryNumber} from="buy" />,
  )

  if (!account) {
    return (
      <Wrapper>
        <UnlockButton />
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <CardActions>
        <Button
          style={{ marginRight: '20px', color: 'black' }}
          width="100%"
          disabled={!lotteryTicketData || lotteryTicketData.length === 0}
          onClick={onPresentMyTickets}
        >
          {t('View your tickets')}
        </Button>
        <Button
          style={{ color: 'black' }}
          width="100%"
          disabled={requestedClaim || rewardTicketIds.length === 0}
          onClick={handleClaim}
        >
          {t('Collect')}
        </Button>
      </CardActions>
      <div>
        <ExternalLinkWrap href={contractLink}>{t('View on ZkSync Era Scan')}</ExternalLinkWrap>
      </div>
    </Wrapper>
  )
}

export default TicketCard
