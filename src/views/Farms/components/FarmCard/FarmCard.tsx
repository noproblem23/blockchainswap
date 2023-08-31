import BigNumber from 'bignumber.js'
import ExpandableSectionButton from 'components/ExpandableSectionButton'
import { BASE_ADD_LIQUIDITY_URL } from 'config'
import { communityFarms } from 'config/constants'
import { useTranslation } from 'contexts/Localization'
import React, { useState } from 'react'
import { FarmWithStakedValue } from 'state/types'
import styled from 'styled-components'
import { Flex, Skeleton, Text } from 'sugarswap-uikit'
import getLiquidityUrlPathParts from 'utils/getLiquidityUrlPathParts'
import { provider as ProviderType } from 'web3-core'

import CardActionsContainer from './CardActionsContainer'
import CardHeading from './CardHeading'
import DetailsSection from './DetailsSection'

const FCard = styled.div`
  align-self: baseline;
  background: ${(props) => props.theme.card.background};
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.24);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding-top: 24px;
  position: relative;
  text-align: center;
`

const Divider = styled.div`
  background-color: ${({ theme }) => theme.colors.borderColor};
  opacity: 0.5;
  height: 1px;
  width: 100%;
  margin-top: 24px;
`

const ExpandingWrapper = styled.div<{ expanded: boolean }>`
  height: ${(props) => (props.expanded ? '100%' : '0px')};
  overflow: hidden;
`
const StyledText = styled.h5<{ bold?: boolean }>`
  color: ${({ theme }) => theme.colors.textDisabled};
  font-style: normal;
  font-size: 14px;
  line-height: 200%;
  ${(props) =>
    props.bold
      ? {
          fontWeight: '700',
        }
      : {
          fontWeight: '500',
          opacity: '0.7',
        }}
`

interface FarmCardProps {
  farm: FarmWithStakedValue
  removed: boolean
  sugarPrice?: BigNumber
  provider?: ProviderType
  account?: string
}

const FarmCard: React.FC<FarmCardProps> = ({ farm, removed, sugarPrice, account }) => {
  const { t } = useTranslation()

  const [showExpandableSection, setShowExpandableSection] = useState(false)

  const isCommunityFarm = communityFarms.includes(farm.token.symbol)
  // We assume the token name is coin pair + lp e.g. SUGAR-CORE LP, LINK-CORE LP,
  // NAR-SUGAR LP. The images should be sugar-core.svg, link-core.svg, nar-sugar.svg
  const farmImage = farm.lpSymbol.split(' ')[0].toLocaleLowerCase()

  const totalValueFormated = farm.liquidity
    ? `$${farm.liquidity.toNumber().toLocaleString(undefined, { maximumFractionDigits: 0 })}`
    : '-'

  const lpLabel = farm.lpSymbol
  const earnLabel = farm.dual ? farm.dual.earnLabel : 'SUGAR  '

  const farmAPY = farm.apy && farm.apy.toLocaleString('en-US', { maximumFractionDigits: 2 })

  const liquidityUrlPathParts = getLiquidityUrlPathParts({
    quoteTokenAdresses: farm.quoteToken.address,
    tokenAddresses: farm.token.address,
  })
  const addLiquidityUrl = `${BASE_ADD_LIQUIDITY_URL}/${liquidityUrlPathParts}`

  return (
    <FCard>
      <CardHeading
        lpLabel={lpLabel}
        multiplier={farm.multiplier}
        isCommunityFarm={isCommunityFarm}
        farmImage={farmImage}
        tokenSymbol={farm.token.symbol}
      />
      <Flex px={24} alignItems="center">
        {!removed && (
          <>
            <StyledText>{t('APR')}:</StyledText>
            <StyledText bold style={{ marginLeft: '2px' }}>
              {farm.apy ? `${farmAPY}%` : <Skeleton height={24} width={80} />}
            </StyledText>
          </>
        )}
        <StyledText style={{ marginLeft: !removed ? '16px' : '0px' }}>{t('Earn')}:</StyledText>
        <StyledText style={{ marginLeft: '2px' }} bold>
          {earnLabel}
        </StyledText>
      </Flex>
      <CardActionsContainer farm={farm} account={account} addLiquidityUrl={addLiquidityUrl} />
      <Divider />
      <ExpandableSectionButton
        onClick={() => setShowExpandableSection(!showExpandableSection)}
        expanded={showExpandableSection}
      />
      <ExpandingWrapper expanded={showExpandableSection}>
        <DetailsSection
          removed={removed}
          coreScanAddress={`https://explorer.zksync.io/address/${farm.lpAddresses[process.env.REACT_APP_CHAIN_ID]}`}
          totalValueFormated={totalValueFormated}
          lpLabel={lpLabel}
          addLiquidityUrl={addLiquidityUrl}
        />
      </ExpandingWrapper>
    </FCard>
  )
}

export default FarmCard
