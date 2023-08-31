import UnlockButton from 'components/UnlockButton'
import { Ifo, IfoStatus } from 'config/constants/types'
import { useTranslation } from 'contexts/Localization'
import * as moment from 'moment'
import React from 'react'
import styled from 'styled-components'
import { Card, CardBody, CardRibbon, Flex, Text } from 'sugarswap-uikit'

import { useWeb3React } from '@web3-react/core'

import useGetPublicIfoData from '../../hooks/useGetPublicIfoData'
import IfoCardActions from './IfoCardActions'
import IfoCardDetails from './IfoCardDetails'
import IfoCardHeader from './IfoCardHeader'
import IfoCardProgress from './IfoCardProgress'
import IfoCardTime from './IfoCardTime'

export interface IfoCardProps {
  ifo: Ifo
}

const StyledIfoCard = styled(Card)<{ ifoId: string }>`
  background-image: ${({ ifoId }) => `url('/images/ifos/${ifoId}-bg.png')`};
  background-repeat: no-repeat;
  background-size: contain;
  padding-top: 160px;
  margin-left: auto;
  margin-right: auto;
  max-width: 437px;
  width: 100%;
  border-radius: 20px;
  box-shadow: 0px 4px 10px 5px rgba(105, 105, 105, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.24);
`

const BoldText = styled(Text)<{ fs?: string }>`
  font-weight: 700;
  font-size: ${(props) => (props.fs ? props.fs : '16px')};
  line-height: 160%;
  font-style: normal;
`
const MediumText = styled(Text)`
  font-size: 12px;
  font-weight: 500;
  font-style: normal;
  line-height: 160%;
  opacity: 0.7;
`

const getRibbonComponent = (status: IfoStatus, t: (fallback: string) => any, isPrivate: boolean) => {
  if (status === 'live') {
    return <CardRibbon variantColor="bow" text={t('LIVE NOW!')} />
  }

  return <CardRibbon variantColor="bow" text={t(isPrivate ? 'Private Sale' : 'Public Sale')} />
}

const IfoCard: React.FC<IfoCardProps> = ({ ifo }) => {
  const {
    id,
    isPrivate,
    name,
    subTitle,
    projectSiteUrl,
    launchDate,
    launchTime,
    saleAmount,
    raiseAmount,
    maxDepositAmount,
    currency,
  } = ifo
  const publicIfoData = useGetPublicIfoData(ifo)
  const { raisingAmount, totalAmount, startTimestamp } = publicIfoData
  const { account } = useWeb3React()
  const { t } = useTranslation()
  const Ribbon = getRibbonComponent(publicIfoData.status, t, isPrivate)
  const launchTimeText = `${moment.unix(startTimestamp).utc().format('MMMM DD, YYYY HH:mm')} GMT`

  return (
    <StyledIfoCard ifoId={id} ribbon={Ribbon} isActive={publicIfoData.status === 'live'}>
      <IfoCardHeader ifoId={id} name={t(name)} subTitle={subTitle} />
      <CardBody style={{ padding: '16px' }}>
        {publicIfoData.status !== 'finished' && ifo.isActive && (
          <>
            <IfoCardProgress progress={publicIfoData.progress} />
            <IfoCardTime
              status={publicIfoData.status}
              secondsUntilStart={publicIfoData.secondsUntilStart}
              secondsUntilEnd={publicIfoData.secondsUntilEnd}
              startTime={publicIfoData.startTimestamp}
              endTime={publicIfoData.endTimestamp}
              // blocksRemaining={publicIfoData.blocksRemaining}
              // blocksRemainingToStart={publicIfoData.blocksRemainingToStart}
              // block={publicIfoData.startTimestamp}
              // blockToEnd={publicIfoData.endTimestamp}
            />
          </>
        )}
        {account ? <IfoCardActions ifo={ifo} publicIfoData={publicIfoData} /> : <UnlockButton width="100%" />}

        <Flex width="100%" marginTop="24px" flexDirection="column">
          <Flex width="100%" flexDirection="row" justifyContent="space-between">
            <MediumText>{t('Launch Time')}:</MediumText>
            <BoldText fs="12px">{launchTimeText}</BoldText>
          </Flex>

          <Flex width="100%" flexDirection="row" justifyContent="space-between">
            <MediumText>{t('For Sale')}:</MediumText>
            <BoldText fs="12px">{saleAmount}</BoldText>
          </Flex>
          <Flex width="100%" flexDirection="row" justifyContent="space-between">
            <MediumText>{t('To raise (USD)')}:</MediumText>
            <BoldText fs="12px">{raiseAmount}</BoldText>
          </Flex>
          <Flex width="100%" flexDirection="row" justifyContent="space-between">
            <MediumText>{t('Total raised (% of target)')}:</MediumText>
            <BoldText fs="12px">{`${totalAmount.div(raisingAmount).times(100).toFixed(2)}%`}</BoldText>
          </Flex>

          <Flex width="100%" flexDirection="row" justifyContent="space-between">
            <MediumText>{t('Max Deposit')}:</MediumText>
            <BoldText fs="12px">{`${maxDepositAmount.toFixed(2)} ${currency}`}</BoldText>
          </Flex>
        </Flex>
      </CardBody>
      <IfoCardDetails ifo={ifo} publicIfoData={publicIfoData} />
    </StyledIfoCard>
  )
}

export default IfoCard
