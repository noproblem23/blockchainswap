import { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { Contract } from 'web3-eth-contract'
import { getSugarAddress, getLotteryAddress, getXsugarAddress } from 'utils/addressHelpers'
import { useERC20, useSugar } from './useContract'
import useRefresh from './useRefresh'

// Retrieve lottery allowance
export const useLotteryAllowance = () => {
  const [allowance, setAllowance] = useState(new BigNumber(0))
  const { account } = useWeb3React()
  const sugarContract = useSugar()
  const { fastRefresh } = useRefresh()

  useEffect(() => {
    const fetchAllowance = async () => {
      const res = await sugarContract.methods.allowance(account, getLotteryAddress()).call()
      setAllowance(new BigNumber(res))
    }

    if (account) {
      fetchAllowance()
    }
  }, [account, sugarContract, fastRefresh])

  return allowance
}

// Retrieve IFO allowance
export const useIfoAllowance = (tokenContract: Contract, spenderAddress: string, dependency?: any): BigNumber => {
  const { account } = useWeb3React()
  const [allowance, setAllowance] = useState(new BigNumber(0))

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await tokenContract.methods.allowance(account, spenderAddress).call()
        setAllowance(new BigNumber(res))
      } catch (e) {
        console.error(e)
      }
    }
    fetch()
  }, [account, spenderAddress, tokenContract, dependency])

  return allowance
}

// Retrieve Xsugar allowance
export const useXsugarAllowance = (update: boolean): BigNumber => {
  const { account } = useWeb3React()
  const [allowance, setAllowance] = useState(new BigNumber(0))
  const tokenContract = useERC20(getSugarAddress())
  const { fastRefresh } = useRefresh()

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await tokenContract.methods.allowance(account, getXsugarAddress()).call()
        setAllowance(new BigNumber(res))
      } catch (e) {
        console.error(e)
      }
    }
    if (account) {
      fetch()
    }
  }, [account, tokenContract, fastRefresh, update])

  return allowance
}
