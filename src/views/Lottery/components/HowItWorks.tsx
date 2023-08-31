import React from 'react'
import styled from 'styled-components'
import { BaseLayout, Text, Heading, Image } from 'sugarswap-uikit'
import { useTranslation } from 'contexts/Localization'

const Cards = styled(BaseLayout)`
  align-items: center;
  justify-items: center;
  margin-bottom: 32px;
  margin-left: 150px;
  margin-right: 150px;

  @media (max-width: 768px) {
    margin-left: 0px;
    margin-right: 0px;
  }

  & > div {
    grid-column: span 6;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 12;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    & > div {
      grid-column: span 6;
    }
  }
`

// const LayoutWrapper = styled.div`
//   display: flex;
//   flex-direction: column;
// `

const StyledHeading = styled(Heading)`
  margin: 16px 0;
`

const StyledImage = styled(Image)`
  align-self: center;
`

const CardColumnWrapper = styled.div<{ isAWin?: boolean }>`
  display: flex;
  flex-direction: column;
`

// const StyledLink = styled(Link)`
//   align-self: center;
//   margin-top: 16px;
// `

const HowItWorks = () => {
  const { t } = useTranslation()

  return (
    <Cards>
      <CardColumnWrapper>
        <StyledHeading size="lg" as="h3" color="text">
          {t('How It Works')}
        </StyledHeading>
        <Text fontSize="16px">
          {t(
            'Spend SUGAR to buy tickets, contributing to the lottery pot. Win prizes if 2, 3 or 4 of your ticket numbers match the winning numbers and their exact order!',
          )}
        </Text>
      </CardColumnWrapper>
      <>
        <StyledImage src="/images/assets/lotteryImage1.png" alt="lottery bunny" width={300} height={280} />
      </>
      {/* <StyledLink href={`https://docs.sugarswap.exchange/lottery-1`}>{t('Read More')}</StyledLink> */}
    </Cards>
  )
}

export default HowItWorks
