import React, { useContext, useState } from 'react'
import styled from 'styled-components'
// import { useWeb3React } from '@web3-react/core'
import { Heading, Card, CardBody, CardFooter, Text } from 'sugarswap-uikit'
import { useTranslation } from 'contexts/Localization'
import { useLotteryInfo, useLotteryMetaData } from 'hooks/useLotteryData'
import PastLotteryDataContext from 'contexts/PastLotteryDataContext'
import ExpandableSectionButton from 'components/ExpandableSectionButton/ExpandableSectionButton'
import PrizeGrid from '../PrizeGrid'

const CardHeading = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
`

const Right = styled.div`
  display: flex;

  ${({ theme }) => theme.mediaQueries.sm} {
    display: none;
  }
`

const Left = styled.div`
  display: flex;
`

const IconWrapper = styled.div`
  margin-right: 16px;
  svg {
    width: 48px;
    height: 48px;
  }
`

const PrizeCountWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const ExpandingWrapper = styled.div<{ showFooter: boolean }>`
  height: ${(props) => (props.showFooter ? '100%' : '0px')};

  ${({ theme }) => theme.mediaQueries.sm} {
    height: 100%;
  }
`

const TotalPrizesCard = () => {
  const { t } = useTranslation()
  // const { account } = useWeb3React()
  const [showFooter, setShowFooter] = useState(false)
  const { currentLotteryNumber } = useContext(PastLotteryDataContext)
  const lotteryInfo = useLotteryInfo(currentLotteryNumber)
  const lotteryMetaData = useLotteryMetaData(currentLotteryNumber)

  return (
    <Card>
      <CardBody>
        {/* {account && (
          <Flex mb="16px" alignItems="center" justifyContent="space-between" style={{ height: '20px' }}>
            {currentLotteryNumber === 0 && <Skeleton height={20} width={56} />}
            {currentLotteryNumber > 0 && (
              <>
                <Text fontSize="12px" style={{ fontWeight: 600 }}>
                  {t(`Round #${currentLotteryNumber}`, { num: currentLotteryNumber })}
                </Text>
              </>
            )}
          </Flex>
        )} */}
        <CardHeading>
          <Left>
            <IconWrapper>
              <img src="/images/tokens/sugar.png" alt="sugar" width="48" />
            </IconWrapper>
            <PrizeCountWrapper>
              <Text fontSize="14px" color="textSubtle">
                {t('Total Pot:')}
              </Text>
              <Heading size="lg">
                {lotteryMetaData ? lotteryMetaData.lotteryCurrentPrize.div(10 ** 18).toFormat(2) : 0.0} SUGAR
              </Heading>
            </PrizeCountWrapper>
          </Left>
          <Right>
            <ExpandableSectionButton onClick={() => setShowFooter(!showFooter)} expanded={showFooter} />
          </Right>
        </CardHeading>
      </CardBody>
      <ExpandingWrapper showFooter={showFooter}>
        <CardFooter>
          <PrizeGrid
            fourMatchesAmount={
              lotteryInfo && lotteryMetaData && lotteryInfo.prizeDistribution[3] > 0
                ? lotteryMetaData.lotteryCurrentPrize
                    .div(10 ** 18)
                    .times(lotteryInfo.prizeDistribution[3])
                    .div(100)
                    .toNumber()
                : 0
            }
            threeMatchesAmount={
              lotteryInfo && lotteryMetaData && lotteryInfo.prizeDistribution[2] > 0
                ? lotteryMetaData.lotteryCurrentPrize
                    .div(10 ** 18)
                    .times(lotteryInfo.prizeDistribution[2])
                    .div(100)
                    .toFormat(2)
                : 0
            }
            twoMatchesAmount={
              lotteryInfo && lotteryMetaData && lotteryInfo.prizeDistribution[1] > 0
                ? lotteryMetaData.lotteryCurrentPrize
                    .div(10 ** 18)
                    .times(lotteryInfo.prizeDistribution[1])
                    .div(100)
                    .toFormat(2)
                : 0
            }
            burnAmount={
              lotteryInfo && lotteryMetaData && lotteryInfo.prizeDistribution[0] > 0
                ? lotteryMetaData.lotteryCurrentPrize
                    .div(10 ** 18)
                    .times(lotteryInfo.prizeDistribution[0])
                    .div(100)
                    .toFormat(2)
                : 0
            }
          />
        </CardFooter>
      </ExpandingWrapper>
    </Card>
  )
}

export default TotalPrizesCard
