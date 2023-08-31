import { usePriceSugarUsd } from 'state/hooks'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalRewards } from './useTickets'

const useLotteryTotalPrizesUsd = () => {
  const totalRewards = useTotalRewards()
  const totalCake = getBalanceNumber(totalRewards)
  const sugarPriceUsd = usePriceSugarUsd()

  return totalCake * sugarPriceUsd.toNumber()
}

export default useLotteryTotalPrizesUsd
