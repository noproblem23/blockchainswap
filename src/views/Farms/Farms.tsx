import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import FlexLayout from 'components/layout/Flex'
import Page from 'components/layout/Page'
import { START_TIMESTAMP } from 'config'
import { useTranslation } from 'contexts/Localization'
import useRefresh from 'hooks/useRefresh'
import { orderBy } from 'lodash'
import React, { useCallback, useEffect, useState } from 'react'
import Countdown from 'react-countdown'
import { useDispatch } from 'react-redux'
import { Route, useLocation, useRouteMatch } from 'react-router-dom'
import { fetchFarmUserDataAsync } from 'state/actions'
import { useFarms, useGetApiPrices, usePriceSugarUsd } from 'state/hooks'
import { Farm, FarmWithStakedValue } from 'state/types'
import styled from 'styled-components'
import { Heading, RowType, Text, Toggle } from 'sugarswap-uikit'
import { getFarmApy } from 'utils/apy'
import { getBalanceNumber } from 'utils/formatBalance'
import FarmCard from './components/FarmCard/FarmCard'
import FarmTabButtons from './components/FarmTabButtons'
import Table from './components/FarmTable/FarmTable'
import { RowProps } from './components/FarmTable/Row'
import SearchInput from './components/SearchInput'
import Select, { OptionProps } from './components/Select/Select'
import { DesktopColumnSchema, ViewMode } from './components/types'

const ControlContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  position: relative;
  margin-top: 40px;
  justify-content: space-between;
  flex-direction: column;

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
    flex-wrap: wrap;
  }
`

const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 26px;

  ${Text} {
    margin-left: 8px;
  }
`

const LabelWrapper = styled.div`
  > ${Text} {
    font-size: 12px;
  }
`

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 8px 0px;

  ${({ theme }) => theme.mediaQueries.sm} {
    width: auto;
    padding: 0;
  }
`

const ViewControls = styled.div`
  flex-wrap: wrap;
  justify-content: space-between;
  display: flex;
  align-items: center;
  width: 100%;

  > div {
    padding: 8px 0px;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    justify-content: flex-start;
    width: auto;

    > div {
      padding: 0;
    }
  }
`

const Background = styled.div`
  // width: 100%;
  // background-image: url('/images/assets/bgf.svg');
  // background-repeat: no-repeat;
  // background-position: top 80px right;
`
const NotifyContainer = styled.div`
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  & div {
    margin-top: 5px;
    display: flex;
    align-items: center;
  }
`

const TimeTextWrapper = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 18px;
  color: ${({ theme }) => theme.colors.text};
`

const Header = styled.div`
  color: #ffffff;
  font-weight: 700;
  font-style: normal;
  h1 {
    font-size: 64px;
    line-height: 140%;
    @media (max-width: 768px) {
      font-size: 40px;
    }
  }
  h6 {
    font-size: 20px;
    line-height: 180%;
    opacity: 0.7;
  }
`

const countDownRenderer = ({ days, hours, minutes, seconds }) => {
  return (
    <TimeTextWrapper>
      <div style={{ display: 'flex', flexDirection: 'row', marginRight: '5px' }}>
        <p style={{ marginRight: '3px' }}>{days}</p>
        <p>Days</p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', marginRight: '5px' }}>
        <p style={{ marginRight: '3px' }}>{hours}</p>
        <p>Hours</p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', marginRight: '5px' }}>
        <p style={{ marginRight: '3px' }}>{minutes}</p>
        <p>Mins</p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', marginRight: '5px' }}>
        <p style={{ marginRight: '3px' }}>{seconds}</p>
        <p>Seconds</p>
      </div>
    </TimeTextWrapper>
  )
}

const Farms: React.FC = () => {
  const { path } = useRouteMatch()
  const { pathname } = useLocation()
  const { t } = useTranslation()
  const farmsLP = useFarms()
  const sugarPrice = usePriceSugarUsd()
  const [query, setQuery] = useState('')
  const [viewMode, setViewMode] = useState(ViewMode.CARD)
  const { account } = useWeb3React()
  const [sortOption, setSortOption] = useState(t('hot'))
  const prices = useGetApiPrices()
  const [timestamp, setTimestamp] = useState(0)

  const dispatch = useDispatch()
  const { fastRefresh } = useRefresh()
  useEffect(() => {
    if (account) {
      dispatch(fetchFarmUserDataAsync(account))
    }
  }, [account, dispatch, fastRefresh])

  useEffect(() => {
    setTimestamp(Math.floor(new Date().getTime() / 1000))
  }, [fastRefresh])

  const [stackedOnly, setStackedOnly] = useState(false)

  const activeFarms = farmsLP.filter((farm) => farm.multiplier !== '0X')
  const inactiveFarms = farmsLP.filter((farm) => farm.multiplier === '0X')

  const stackedOnlyFarms = activeFarms.filter(
    (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0),
  )

  const sortFarms = (farms: FarmWithStakedValue[]): FarmWithStakedValue[] => {
    switch (sortOption) {
      case 'farmApr':
        return orderBy(farms, 'farmApr', 'desc')
      case 'feeApr':
        return orderBy(farms, 'feeApr', 'desc')
      case 'multiplier':
        return orderBy(
          farms,
          (farm: FarmWithStakedValue) => (farm.multiplier ? Number(farm.multiplier.slice(0, -1)) : 0),
          'desc',
        )
      case 'earned':
        return orderBy(farms, (farm: FarmWithStakedValue) => (farm.userData ? farm.userData.earnings : 0), 'desc')
      case 'liquidity':
        return orderBy(farms, (farm: FarmWithStakedValue) => Number(farm.liquidity), 'desc')
      default:
        return farms
    }
  }

  const farmsList = useCallback(
    (farmsToDisplay: Farm[]): FarmWithStakedValue[] => {
      let farmsToDisplayWithAPY: FarmWithStakedValue[] = farmsToDisplay.map((farm) => {
        if (!farm.lpTotalInQuoteToken || !prices || !farm.lpTokenBalanceMC) {
          return farm
        }

        const quoteTokenPriceUsd = prices[farm.quoteToken.symbol.toLowerCase()]
        const totalLiquidity = new BigNumber(farm.lpTotalInQuoteToken).times(quoteTokenPriceUsd)
        const lpPrice = totalLiquidity.div(farm.lpTokenBalanceMC)
        const farmApr = getFarmApy(farm.poolWeight, sugarPrice, totalLiquidity, farm.tokenPerSecond)

        return { ...farm, apy: farmApr + farm.feeApr, farmApr, liquidity: totalLiquidity, lpPrice }
      })

      if (query) {
        const lowercaseQuery = query.toLowerCase()
        farmsToDisplayWithAPY = farmsToDisplayWithAPY.filter((farm: FarmWithStakedValue) => {
          if (farm.lpSymbol.toLowerCase().includes(lowercaseQuery)) {
            return true
          }

          return false
        })
      }
      return farmsToDisplayWithAPY
    },
    [sugarPrice, prices, query],
  )

  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }

  const isActive = !pathname.includes('history')
  let farmsStaked = []
  if (isActive) {
    farmsStaked = stackedOnly ? farmsList(stackedOnlyFarms) : farmsList(activeFarms)
  } else {
    farmsStaked = farmsList(inactiveFarms)
  }

  farmsStaked = sortFarms(farmsStaked)

  // TODO: uncomment this line
  farmsStaked = []

  const rowData = farmsStaked.map((farm) => {
    const lpLabel = farm.lpSymbol && farm.lpSymbol.split(' ')[0].replace('ARCHER', '')

    const row: RowProps = {
      farmApr:
        (farm.farmApr || farm.farmApr === 0) && farm.farmApr.toLocaleString('en-US', { maximumFractionDigits: 2 }),
      feeApr: (farm.feeApr || farm.feeApr === 0) && farm.feeApr.toLocaleString('en-US', { maximumFractionDigits: 2 }),
      apr: {
        farmApr:
          farm.farmApr || farm.farmApr === 0 ? farm.farmApr.toLocaleString('en-US', { maximumFractionDigits: 2 }) : '',
        feeApr: (farm.feeApr || farm.feeApr === 0) && farm.feeApr.toLocaleString('en-US', { maximumFractionDigits: 2 }),
        apr: (farm.farmApr + farm.feeApr).toLocaleString('en-US', { maximumFractionDigits: 2 }),
      },
      farm: {
        image: farm.lpSymbol.split(' ')[0].toLocaleLowerCase(),
        label: lpLabel,
        pid: farm.pid,
      },
      earned: {
        earnings: farm.userData ? getBalanceNumber(new BigNumber(farm.userData.earnings)) : null,
        pid: farm.pid,
      },
      liquidity: {
        liquidity: farm.liquidity,
      },
      multiplier: {
        multiplier: farm.multiplier,
      },
      details: farm,
    }

    return row
  })

  const renderContent = (): JSX.Element => {
    if (viewMode === ViewMode.TABLE && rowData.length) {
      const columnSchema = DesktopColumnSchema

      const columns = columnSchema.map((column) => ({
        id: column.id,
        name: column.name,
        label: column.label,
        sort: (a: RowType<RowProps>, b: RowType<RowProps>) => {
          switch (column.name) {
            case 'farm':
              return b.id - a.id
            case 'farmApr':
              if (a.original.farmApr && b.original.farmApr) {
                return Number(a.original.farmApr) - Number(b.original.farmApr)
              }

              return 0
            case 'feeApr':
              if (a.original.feeApr && b.original.feeApr) {
                return Number(a.original.feeApr) - Number(b.original.feeApr)
              }

              return 0
            case 'apr':
              if (a.original.apr && b.original.apr) {
                return Number(a.original.apr) - Number(b.original.apr)
              }

              return 0
            case 'earned':
              return a.original.earned.earnings - b.original.earned.earnings
            default:
              return 1
          }
        },
        sortable: column.sortable,
      }))

      return <Table data={rowData} columns={columns} />
    }

    return (
      <div style={{ marginTop: 16 }}>
        <FlexLayout>
          <Route exact path={`${path}`}>
            {farmsStaked.map((farm) => (
              <FarmCard key={farm.pid} farm={farm} sugarPrice={sugarPrice} account={account} removed={false} />
            ))}
          </Route>
          <Route exact path={`${path}/history`}>
            {farmsStaked.map((farm) => (
              <FarmCard key={farm.pid} farm={farm} sugarPrice={sugarPrice} account={account} removed />
            ))}
          </Route>
        </FlexLayout>
      </div>
    )
  }

  const handleSortOptionChange = (option: OptionProps): void => {
    setSortOption(option.value)
  }

  return (
    <Background>
      <Page>
        <Header>
          <h1>{t('Farms')}</h1>
          <h6>{t('Stake tokens to earn SWEET')}</h6>
        </Header>
        {timestamp !== 0 && timestamp <= START_TIMESTAMP && (
          <NotifyContainer>
            <Heading as="h2" size="lg" color="success">
              {t('SUGAR Farming Countdown')}
            </Heading>
            <div>
              <Countdown date={new Date('Tue, 14 Mar 2023 15:30:00 +0000')} renderer={countDownRenderer} />
            </div>
          </NotifyContainer>
        )}
        <ControlContainer>
          <ViewControls>
            <FarmTabButtons />
            <ToggleWrapper>
              <Toggle checked={stackedOnly} onChange={() => setStackedOnly(!stackedOnly)} scale="sm" />
              <Text color="textSubtle" style={{ fontWeight: 700, fontSize: '12px', lineHeight: '200%' }}>
                {t('Staked only')}
              </Text>
            </ToggleWrapper>
          </ViewControls>
          <FilterContainer>
            <LabelWrapper>
              <Text
                color="textSubtle"
                style={{ fontWeight: 700, fontSize: '12px', lineHeight: '15px', marginBottom: '2px' }}
              >
                {t('Sort by')}
              </Text>
              <Select
                options={[
                  {
                    label: t('Hot'),
                    value: 'hot',
                  },
                  {
                    label: t('Farm APR'),
                    value: 'farmApr',
                  },
                  {
                    label: t('LP Fee APR'),
                    value: 'feeApr',
                  },
                  {
                    label: t('Multiplier'),
                    value: 'multiplier',
                  },
                  {
                    label: t('Earned'),
                    value: 'earned',
                  },
                  {
                    label: t('Liquidity'),
                    value: 'liquidity',
                  },
                ]}
                onChange={handleSortOptionChange}
              />
            </LabelWrapper>
            <LabelWrapper style={{ marginLeft: 16 }}>
              <Text
                color="textSubtle"
                style={{ fontWeight: 700, fontSize: '12px', lineHeight: '15px', marginBottom: '2px' }}
              >
                {t('Search')}
              </Text>
              <SearchInput onChange={handleChangeQuery} value={query} />
            </LabelWrapper>
          </FilterContainer>
        </ControlContainer>
        {renderContent()}
      </Page>
    </Background>
  )
}

export default Farms
