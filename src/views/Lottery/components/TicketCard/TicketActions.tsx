import React, { useContext, useState, useEffect } from 'react'
import BigNumber from 'bignumber.js'
import moment from 'moment'
import styled from 'styled-components'
import { Button, useModal } from 'sugarswap-uikit'
import { useTranslation } from 'contexts/Localization'
import PastLotteryDataContext from 'contexts/PastLotteryDataContext'
import { useLotteryInfo, useLotteryMetaData } from 'hooks/useLotteryData'
import { useLotteryAllowance } from 'hooks/useAllowance'
import useTokenBalance from 'hooks/useTokenBalance'
import { getSugarAddress } from 'utils/addressHelpers'
import { useApproval } from 'hooks/useApproval'
import BuyTicketModal from './BuyTicketModal'
import MyTicketsModal from './UserTicketsModal'
import PurchaseWarningModal from './PurchaseWarningModal'

const CardActions = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${(props) => props.theme.spacing[3]}px;

  ${({ theme }) => theme.mediaQueries.lg} {
    justify-content: space-between;
  }
`
interface TicketCardProps {
  tickets?: Array<any>
}

const TicketCard: React.FC<TicketCardProps> = ({ tickets = [] }) => {
  const { t } = useTranslation()
  const allowance = useLotteryAllowance()
  const { currentLotteryNumber } = useContext(PastLotteryDataContext)
  const [lotteryStatus, setLotteryStatus] = useState(0)
  const [confirm, setConfirm] = useState(false)
  const lotteryInfo = useLotteryInfo(currentLotteryNumber)
  const lotteryMetaData = useLotteryMetaData(currentLotteryNumber)

  const onConfirm = () => {
    setConfirm(true)
  }

  useEffect(() => {
    if (lotteryInfo) setLotteryStatus(lotteryInfo.lotteryStatus)
  }, [lotteryInfo])

  const cakeBalance = useTokenBalance(getSugarAddress())
  const ticketsLength = tickets ? tickets.length : 0
  const [onPresentMyTickets] = useModal(<MyTicketsModal myTicketNumbers={tickets} from="buy" />)
  const [onPresentApprove] = useModal(<PurchaseWarningModal onConfirm={onConfirm} />)
  const [onPresentBuy] = useModal(
    <BuyTicketModal
      max={cakeBalance}
      tokenName="SUGAR"
      lotteryId={currentLotteryNumber}
      lotterySize={lotteryMetaData ? lotteryMetaData.lotterySize : 4}
      maxRange={lotteryMetaData ? lotteryMetaData.lotteryMaxRange : 10}
      ticketPrice={lotteryInfo ? new BigNumber(lotteryInfo.costPerTicket).div(10 ** 18).toNumber() : 1}
    />,
  )
  const { handleApprove, requestedApproval } = useApproval(null)

  const approveHandler = () => {
    onPresentApprove()
  }

  useEffect(() => {
    if (confirm) {
      setConfirm(false)
      handleApprove()
    }
  }, [confirm, handleApprove])

  const renderLotteryTicketButtons = (buyPossible) => {
    if (!allowance.toNumber()) {
      return (
        <>
          <Button style={{ marginRight: '20px' }} width="100%" disabled>
            {t('View your tickets')}
          </Button>
          <Button width="100%" disabled={requestedApproval || !buyPossible} onClick={approveHandler}>
            {t('Approve SUGAR')}
          </Button>
        </>
      )
    }
    return (
      <>
        <Button
          style={{ marginRight: '20px' }}
          width="100%"
          disabled={ticketsLength === 0}
          variant="secondary"
          onClick={onPresentMyTickets}
        >
          {t('View your tickets')}
        </Button>
        <Button id="lottery-buy-start" width="100%" disabled={!buyPossible} onClick={onPresentBuy}>
          {t('Buy ticket')}
        </Button>
      </>
    )
  }

  return (
    <CardActions>
      {!lotteryInfo ||
      (lotteryStatus === 0 && lotteryInfo.startingTimestamp > 0 && lotteryInfo.startingTimestamp > moment().unix()) ||
      lotteryStatus === 4 ? (
        // <Button disabled> {t('On sale soon')}</Button>
        <></>
      ) : (
        renderLotteryTicketButtons(lotteryInfo.closingTimestamp > 0 && lotteryInfo.closingTimestamp > moment().unix())
      )}
    </CardActions>
  )
}

export default TicketCard
