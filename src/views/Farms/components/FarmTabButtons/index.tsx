import { useTranslation } from 'contexts/Localization'
import React from 'react'
import { Link, useRouteMatch } from 'react-router-dom'
import styled from 'styled-components'
import { ButtonMenu, ButtonMenuItem, useMatchBreakpoints } from 'sugarswap-uikit'

const FarmTabButtons = () => {
  const { url, isExact } = useRouteMatch()
  const { t } = useTranslation()
  const { isXl } = useMatchBreakpoints()

  const isMobile = !isXl

  return (
    <Wrapper>
      <ButtonMenu activeIndex={isExact ? 0 : 1} scale="sm" variant="subtle">
        <ButtonMenuItem
          as={Link}
          to={`${url}`}
          style={{
            height: '28px',
            borderRadius: '30px',
            width: isMobile ? '96px' : '128px',
            fontWeight: 700,
            fontSize: '12px',
            lineHeight: '200%',
          }}
        >
          {t('Live')}
        </ButtonMenuItem>
        <ButtonMenuItem
          as={Link}
          to={`${url}/history`}
          style={{
            height: '28px',
            borderRadius: '30px',
            width: isMobile ? '96px' : '128px',
            marginLeft: 0,
            fontWeight: 700,
            fontSize: '12px',
            lineHeight: '200%',
          }}
        >
          {t('Finished')}
        </ButtonMenuItem>
      </ButtonMenu>
    </Wrapper>
  )
}

export default FarmTabButtons

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  a {
    padding-left: 12px;
    padding-right: 12px;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
  }
`
