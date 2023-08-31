import { useTranslation } from 'contexts/Localization'
import React from 'react'
import styled from 'styled-components'
import { Flex, LinkExternal, Text } from 'sugarswap-uikit'

export interface ExpandableSectionProps {
  coreScanAddress?: string
  removed?: boolean
  totalValueFormated?: string
  lpLabel?: string
  addLiquidityUrl?: string
}

const Wrapper = styled.div`
  padding: 0 16px;
`

const StyledLinkExternal = styled(LinkExternal)`
  text-decoration: none;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;
  font-size: 12px;

  svg {
    padding-left: 4px;
    height: 18px;
    width: auto;
    fill: ${({ theme }) => theme.colors.primary};
  }
`

const DetailsSection: React.FC<ExpandableSectionProps> = ({
  coreScanAddress,
  removed,
  totalValueFormated,
  lpLabel,
  addLiquidityUrl,
}) => {
  const { t } = useTranslation()

  return (
    <Wrapper>
      <Flex justifyContent="space-between">
        <Text color="textSubtle" style={{ fontSize: '12px', opacity: 0.7 }}>
          {t('Stake')}:
        </Text>
        <StyledLinkExternal href={addLiquidityUrl}>{lpLabel}</StyledLinkExternal>
      </Flex>
      {!removed && (
        <Flex justifyContent="space-between" mb={16}>
          <Text color="textSubtle" style={{ fontSize: '12px', opacity: 0.7 }}>
            {t('Total Liquidity')}:
          </Text>
          <Text style={{ fontSize: '12px', fontWeight: '700' }}>{totalValueFormated}</Text>
        </Flex>
      )}
    </Wrapper>
  )
}

export default DetailsSection
