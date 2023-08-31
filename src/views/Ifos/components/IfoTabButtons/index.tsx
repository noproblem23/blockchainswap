import { ifosConfig } from 'config/constants'
import { Ifo } from 'config/constants/types'
import { useTranslation } from 'contexts/Localization'
import React from 'react'
import { Link, useRouteMatch } from 'react-router-dom'
import styled from 'styled-components'
import { ButtonMenu, ButtonMenuItem } from 'sugarswap-uikit'

const inactiveIfo: Ifo[] = ifosConfig.filter((ifo) => !ifo.isActive)

const IfoTabButtons = () => {
  const { url, isExact } = useRouteMatch()
  const { t } = useTranslation()

  return (
    <>
      {inactiveIfo.length > 0 ? (
        <Wrapper>
          <ButtonMenu activeIndex={isExact ? 0 : 1} scale="sm" variant="subtle">
            <ButtonMenuItem
              as={Link}
              to={`${url}`}
              style={{
                borderRadius: '30px',
                height: '28px',
                width: '128px',
                fontWeight: 700,
                fontSize: '12px',
                lineHeight: '200%',
              }}
            >
              {t('Next IDO')}
            </ButtonMenuItem>
            <ButtonMenuItem
              as={Link}
              to={`${url}/history`}
              style={{
                height: '28px',
                borderRadius: '30px',
                width: '128px',
                marginLeft: 0,
                fontWeight: 700,
                fontSize: '12px',
                lineHeight: '200%',
              }}
            >
              {t('Past IDOs')}
            </ButtonMenuItem>
          </ButtonMenu>
        </Wrapper>
      ) : (
        <></>
      )}
    </>
  )
}

export default IfoTabButtons

const Wrapper = styled.div`
  display: flex;
  margin-top: 64px;
  a {
    padding-left: 12px;
    padding-right: 12px;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    margin-top: 30px;
  }

  @media (max-width: 767px) {
    margin-top: 64px;
  }
`
