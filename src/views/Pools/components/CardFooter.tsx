import BigNumber from 'bignumber.js'
import Balance from 'components/Balance'
import { CommunityTag, CoreTag } from 'components/Tags'
import { BASE_URL } from 'config'
import { PoolCategory } from 'config/constants/types'
import { useTranslation } from 'contexts/Localization'
import React, { useMemo, useState } from 'react'
import { ChevronDown, ChevronUp } from 'react-feather'
import styled from 'styled-components'
import { Flex, MetamaskIcon, Text } from 'sugarswap-uikit'
import { getBalanceNumber } from 'utils/formatBalance'
import { registerToken } from 'utils/wallet'

const tags = {
  [PoolCategory.CORE]: CoreTag,
  [PoolCategory.COMMUNITY]: CommunityTag,
}

interface Props {
  projectLink: string
  decimals: number
  totalStaked: BigNumber
  tokenName: string
  tokenAddress: string
  tokenDecimals: number
  startTime: number
  endTime: number
  isFinished: boolean
  poolCategory: PoolCategory
}

const StyledFooter = styled.div<{ isFinished: boolean }>`
  border-top: 1px solid ${({ theme }) => (theme.isDark ? theme.colors.borderColor : '#E9EAEB')};
  color: ${({ isFinished, theme }) => theme.colors[isFinished ? 'textDisabled2' : 'primary2']};
  padding: 10px 0px;
  margin-top: 12px;
`

const StyledDetailsButton = styled.button`
  align-items: center;
  background-color: transparent;
  border: 0;
  color: ${(props) => props.theme.colors.text};
  cursor: pointer;
  display: inline-flex;
  font-size: 12px;
  font-weight: 700;
  height: 32px;
  justify-content: center;
  outline: 0;
  padding: 0;
  &:hover {
    opacity: 0.9;
  }

  & > svg {
    margin-left: 4px;
  }
`

const Row = styled(Flex)`
  justify-content: center;
  align-items: center;
`

const TokenLink = styled.a`
  font-size: 14px;
  text-decoration: none;
  color: ${(props) => props.theme.colors.primary};
  cursor: pointer;
`

const Wrapper = styled.div`
  padding: 0 24px;
`

const CardFooter: React.FC<Props> = ({
  projectLink,
  decimals,
  tokenAddress,
  totalStaked,
  tokenName,
  tokenDecimals,
  isFinished,
  startTime,
  endTime,
  poolCategory,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const { t } = useTranslation()
  const Icon = isOpen ? ChevronUp : ChevronDown

  const handleClick = () => setIsOpen(!isOpen)
  const Tag = tags[poolCategory]

  const blocksUntilStart = useMemo(() => {
    const currentTimestamp = Math.floor(new Date().getTime() / 1000)
    return Math.max(startTime - currentTimestamp, 0)
  }, [startTime])

  const blocksRemaining = useMemo(() => {
    const currentTimestamp = Math.floor(new Date().getTime() / 1000)
    return Math.max(endTime - currentTimestamp, 0)
  }, [endTime])

  const imageSrc = `${BASE_URL}/images/tokens/${tokenName.toLowerCase()}.png`

  return (
    <StyledFooter isFinished={isFinished}>
      <Row>
        <StyledDetailsButton onClick={handleClick}>
          {isOpen ? t('Hide') : t('Details')} <Icon width="24px" height="24px" />
        </StyledDetailsButton>
      </Row>
      {isOpen && (
        <Wrapper>
          <Flex justifyContent="space-between" mb={10}>
            <Text color="textSubtle" style={{ fontSize: '12px', opacity: 0.7 }}>
              {t('Total')}
            </Text>
            <Balance fontSize="12px" isDisabled={isFinished} value={getBalanceNumber(totalStaked, decimals)} />
          </Flex>
          {blocksUntilStart > 0 && (
            <Flex justifyContent="space-between" mb={16}>
              <Text color="textSubtle" style={{ fontSize: '12px', opacity: 0.7 }}>
                {t('Start')}:{' '}
              </Text>
              <Balance fontSize="12px" isDisabled={isFinished} value={blocksUntilStart} decimals={0} />
            </Flex>
          )}
          {blocksUntilStart === 0 && blocksRemaining > 0 && (
            <Flex justifyContent="space-between" mb={10}>
              <Text color="textSubtle" style={{ fontSize: '12px', opacity: 0.7 }}>
                {t('End')}:
              </Text>
              <Balance fontSize="12px" isDisabled={isFinished} value={blocksRemaining} decimals={0} />
            </Flex>
          )}
          {tokenAddress && (
            <Flex mb="4px">
              <TokenLink onClick={() => registerToken(tokenAddress, tokenName, tokenDecimals, imageSrc)}>
                {t('Add to Metamask')}
              </TokenLink>
              <MetamaskIcon height={15} width={15} ml="4px" />
            </Flex>
          )}
          <TokenLink href={projectLink} target="_blank">
            {t('View Project Site')}
          </TokenLink>
        </Wrapper>
      )}
    </StyledFooter>
  )
}

export default React.memo(CardFooter)
