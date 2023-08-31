import React from 'react'
import styled from 'styled-components'
import { Flex, Heading } from 'sugarswap-uikit'

export interface ExpandableSectionProps {
  lpLabel?: string
  multiplier?: string
  isCommunityFarm?: boolean
  farmImage?: string
  tokenSymbol?: string
}

const Wrapper = styled(Flex)`
  svg {
    margin-right: 4px;
  }
`

const IconImage = styled.div`
  display: flex;
  margin-right: 5px;
  .first {
    position: relative;
    display: block;
    border-radius: 50%;
    z-index: 2;
    width: 30px;
    height: 30px;

    ${({ theme }) => theme.mediaQueries.sm} {
      width: 24px;
      height: 24px;
    }
  }
  .last {
    z-index: 3;
    display: block;
    margin-left: -2px;
    border-radius: 50%;
    width: 30px;
    height: 30px;

    ${({ theme }) => theme.mediaQueries.sm} {
      width: 24px;
      height: 24px;
    }
  }
`

const CardHeading: React.FC<ExpandableSectionProps> = ({
  lpLabel,
  multiplier,
  isCommunityFarm,
  farmImage,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  tokenSymbol,
}) => {
  return (
    <Wrapper px={24} alignItems="center">
      <IconImage>
        <img className="first" src={`/images/tokens/${farmImage.split('-')[0].toLocaleLowerCase()}.png`} alt="icon" />
        <img className="last" src={`/images/tokens/${farmImage.split('-')[1].toLocaleLowerCase()}.png`} alt="icon" />
      </IconImage>
      <Heading>{lpLabel.split(' ')[0]}</Heading>
    </Wrapper>
  )
}

export default CardHeading
