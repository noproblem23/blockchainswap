import React from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { Modal, Text, LinkExternal, Flex } from 'sugarswap-uikit'
import { useTranslation } from 'contexts/Localization'
import { calculateSugarEarnedPerThousandDollars, apyModalRoi } from 'utils/compoundApyHelpers'

interface ApyCalculatorModalProps {
  onDismiss?: () => void
  lpLabel?: string
  sugarPrice?: BigNumber
  apy?: number
  farmApr?: number
  feeApr?: number
  addLiquidityUrl?: string
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(4, auto);
  margin-bottom: 24px;
`

const GridItem = styled.div`
  margin-bottom: '10px';
`

const Description = styled(Text)`
  max-width: 320px;
  margin-bottom: 28px;
`

const ApyCalculatorModal: React.FC<ApyCalculatorModalProps> = ({
  onDismiss,
  lpLabel,
  sugarPrice,
  apy,
  farmApr,
  feeApr,
  addLiquidityUrl,
}) => {
  const { t } = useTranslation()
  const oneThousandDollarsWorthOfCake = 1000 / sugarPrice.toNumber()

  const sugarEarnedPerThousand1D = calculateSugarEarnedPerThousandDollars({ numberOfDays: 1, farmApy: apy, sugarPrice })
  const sugarEarnedPerThousand7D = calculateSugarEarnedPerThousandDollars({ numberOfDays: 7, farmApy: apy, sugarPrice })
  const sugarEarnedPerThousand30D = calculateSugarEarnedPerThousandDollars({
    numberOfDays: 30,
    farmApy: apy,
    sugarPrice,
  })
  const sugarEarnedPerThousand365D = calculateSugarEarnedPerThousandDollars({
    numberOfDays: 365,
    farmApy: apy,
    sugarPrice,
  })

  return (
    <Modal title="ROI" onDismiss={onDismiss}>
      <Grid>
        <GridItem>
          <Text fontSize="12px" bold color="textSubtle" textTransform="uppercase" mb="20px">
            {t('Timeframe')}
          </Text>
        </GridItem>
        <GridItem>
          <Text fontSize="12px" bold color="textSubtle" textTransform="uppercase" mb="20px">
            {t('ROI')}
          </Text>
        </GridItem>
        <GridItem>
          <Text fontSize="12px" bold color="textSubtle" mb="20px">
            {t('SUGAR per $1000')}
          </Text>
        </GridItem>
        {/* 1 day row */}
        <GridItem>
          <Text>1d</Text>
        </GridItem>
        <GridItem>
          <Text>
            {apyModalRoi({ amountEarned: sugarEarnedPerThousand1D, amountInvested: oneThousandDollarsWorthOfCake })}%
          </Text>
        </GridItem>
        <GridItem>
          <Text>{sugarEarnedPerThousand1D}</Text>
        </GridItem>
        {/* 7 day row */}
        <GridItem>
          <Text>7d</Text>
        </GridItem>
        <GridItem>
          <Text>
            {apyModalRoi({ amountEarned: sugarEarnedPerThousand7D, amountInvested: oneThousandDollarsWorthOfCake })}%
          </Text>
        </GridItem>
        <GridItem>
          <Text>{sugarEarnedPerThousand7D}</Text>
        </GridItem>
        {/* 30 day row */}
        <GridItem>
          <Text>30d</Text>
        </GridItem>
        <GridItem>
          <Text>
            {apyModalRoi({ amountEarned: sugarEarnedPerThousand30D, amountInvested: oneThousandDollarsWorthOfCake })}%
          </Text>
        </GridItem>
        <GridItem>
          <Text>{sugarEarnedPerThousand30D}</Text>
        </GridItem>
        {/* 365 day / APY row */}
        <GridItem>
          <Text>365d(APY)</Text>
        </GridItem>
        <GridItem>
          <Text>
            {apyModalRoi({ amountEarned: sugarEarnedPerThousand365D, amountInvested: oneThousandDollarsWorthOfCake })}%
          </Text>
        </GridItem>
        <GridItem>
          <Text>{sugarEarnedPerThousand365D}</Text>
        </GridItem>
      </Grid>
      <Description fontSize="12px" color="textSubtle">
        {t(
          'Calculated based on current rates. Compounding once daily. Rates are estimates provided for your convenience only, and by no means represent guaranteed returns.',
        )}
      </Description>
      <Flex justifyContent="space-between" mb="10px">
        <Text fontSize="14px" bold color="textSubtle">
          {t('Farm APR')}
        </Text>
        <Text fontSize="14px" color="textSubtle">
          {farmApr && farmApr.toFixed(2)}%
        </Text>
      </Flex>
      <Flex justifyContent="space-between" mb="10px">
        <Text fontSize="14px" bold color="textSubtle">
          {t('LP Fee APR')}
        </Text>
        <Text fontSize="14px" color="textSubtle">
          {feeApr && feeApr.toFixed(2)}%
        </Text>
      </Flex>
      <Flex justifyContent="center">
        <LinkExternal href={addLiquidityUrl}>{t('Get %symbol%', { symbol: lpLabel })}</LinkExternal>
      </Flex>
    </Modal>
  )
}

export default ApyCalculatorModal
