import { useEffect, useState, useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import { getSugarAddress, getXsugarAddress } from 'utils/addressHelpers'
import { xsugarStake, xsugarUnstake } from 'utils/callHelpers'
import useRefresh from './useRefresh'
import { useERC20, useXsugar } from './useContract'
import useGasBoost from './useGasBoost'

const useSugarInfo = () => {
  const [totalLockedSugar, setTotalLockedSugar] = useState(new BigNumber(0))
  const [xsugarRatio, setXsugarRatio] = useState(new BigNumber(0))
  const [delayToWithdraw, setDelayToWithdraw] = useState(0)
  const { account } = useWeb3React()
  const { fastRefresh } = useRefresh()
  const xsugarContract = useXsugar()
  const sugarContract = useERC20(getSugarAddress())

  useEffect(() => {
    const fetchInfo = async () => {
      const [res0, res1, res2] = await Promise.all([
        sugarContract.methods.balanceOf(getXsugarAddress()).call(),
        xsugarContract.methods.xSUGARForSUGAR(10000).call(),
        xsugarContract.methods.delayToWithdraw().call(),
      ])
      setTotalLockedSugar(new BigNumber(res0).div(1e18))
      setXsugarRatio(new BigNumber(res1).div(1e4))
      setDelayToWithdraw(Number(res2))
    }
    fetchInfo()
  }, [account, xsugarContract, sugarContract, fastRefresh])

  return { totalLockedSugar, xsugarRatio, delayToWithdraw }
}

export const useUserInfo = () => {
  const [sugarBalance, setSugarBalance] = useState(new BigNumber(0))
  const [xsugarBalance, setXsugarBalance] = useState(new BigNumber(0))
  const [claimableAmount, setClaimableAmount] = useState(new BigNumber(0))
  const [stakedTime, setStakedTime] = useState(0)
  const { account } = useWeb3React()
  const { fastRefresh } = useRefresh()
  const xsugarContract = useXsugar()
  const sugarContract = useERC20(getSugarAddress())

  useEffect(() => {
    const fetchInfo = async () => {
      const [res0, res1, res2, res3] = await Promise.all([
        sugarContract.methods.balanceOf(account).call(),
        xsugarContract.methods.balanceOf(account).call(),
        xsugarContract.methods.SUGARBalance(account).call(),
        xsugarContract.methods.stakedTime(account).call(),
      ])
      setSugarBalance(new BigNumber(res0))
      setXsugarBalance(new BigNumber(res1))
      setClaimableAmount(new BigNumber(res2).div(1e18))
      setStakedTime(Number(res3))
    }
    if (account) {
      fetchInfo()
    }
  }, [account, xsugarContract, sugarContract, fastRefresh])

  return { sugarBalance, xsugarBalance, claimableAmount, stakedTime }
}

export const useXsugarStake = () => {
  const { account } = useWeb3React()
  const xsugarContract = useXsugar()

  const { gasBoostedPrice } = useGasBoost()
  const handleStake = useCallback(
    async (amount: string) => {
      const txHash = await xsugarStake(xsugarContract, amount, account, gasBoostedPrice)
      console.info(txHash)
    },
    [account, xsugarContract, gasBoostedPrice],
  )

  return { onStake: handleStake }
}

export const useXsugarUnstake = () => {
  const { account } = useWeb3React()
  const xsugarContract = useXsugar()
  const { gasBoostedPrice } = useGasBoost()

  const handleUnstake = useCallback(
    async (amount: string) => {
      const txHash = await xsugarUnstake(xsugarContract, amount, account, gasBoostedPrice)
      console.info(txHash)
    },
    [account, xsugarContract, gasBoostedPrice],
  )

  return { onUnstake: handleUnstake }
}

export default useSugarInfo
