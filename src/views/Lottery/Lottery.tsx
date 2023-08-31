import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { ButtonMenu, ButtonMenuItem } from 'sugarswap-uikit'
import PastLotteryDataContext from 'contexts/PastLotteryDataContext'
import { useLotteryCurrentRoundNo } from 'hooks/useLotteryData'
import { fetchLotteryGraphData } from 'utils/fetchLotteryData'
import { useTranslation } from 'contexts/Localization'
import useTheme from 'hooks/useTheme'
import Page from 'components/layout/Page'
import Hero from './components/Hero'
import Divider from './components/Divider'
import NextDrawPage from './NextDrawPage'
import PastDrawsPage from './PastDrawsPage'

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 32px;
`
const Background = styled.div`
  width: 100%;
  // background-image: url('/images/assets/bg6.svg');
  // background-repeat: no-repeat;
  // background-position: top 80px right;
`

const Lottery: React.FC = () => {
  const { t } = useTranslation()
  const [activeIndex, setActiveIndex] = useState(0)
  const [historyData, setHistoryData] = useState({ idList: ['1'], poolData: [0], burnedData: [0] })
  const historyError = false
  const lotteryCurrentRoundNo = useLotteryCurrentRoundNo()
  const { isDark } = useTheme()
  const textColor = isDark ? '' : '#2A2A2A'

  useEffect(() => {
    async function getGraphData(startLotteryNo, endLotteryNo) {
      const graphData = await fetchLotteryGraphData(startLotteryNo, endLotteryNo)
      if (graphData)
        setHistoryData({ idList: graphData.idList, poolData: graphData.poolData, burnedData: graphData.burnedData })
    }
    if (lotteryCurrentRoundNo >= 1) {
      getGraphData(1, lotteryCurrentRoundNo)
    }
  }, [lotteryCurrentRoundNo])

  const handleClick = (index) => {
    setActiveIndex(index)
  }

  return (
    <>
      <PastLotteryDataContext.Provider
        value={{
          historyError,
          historyData,
          mostRecentLotteryNumber: lotteryCurrentRoundNo - 1,
          currentLotteryNumber: lotteryCurrentRoundNo,
        }}
      >
        <Hero />
        <Background>
          <Page>
            <Wrapper>
              <ButtonMenu activeIndex={activeIndex} onItemClick={handleClick} scale="sm" variant="primary">
                <ButtonMenuItem style={{ borderRadius: '30px', width: '140px', color: textColor }}>
                  {t('Next draw')}
                </ButtonMenuItem>
                <ButtonMenuItem style={{ borderRadius: '30px', width: '140px', color: textColor }}>
                  {t('Past draws')}
                </ButtonMenuItem>
              </ButtonMenu>
            </Wrapper>
            {activeIndex === 0 ? <NextDrawPage /> : <PastDrawsPage />}
          </Page>
        </Background>
      </PastLotteryDataContext.Provider>
    </>
  )
}

export default Lottery
