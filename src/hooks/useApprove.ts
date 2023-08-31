import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { Contract } from 'web3-eth-contract'
import { ethers } from 'ethers'
import { useDispatch } from 'react-redux'
import { updateUserAllowance, fetchFarmUserDataAsync, fetchVaultUserDataAsync } from 'state/actions'
import { approve, approveVault } from 'utils/callHelpers'
import { getSugarAddress, getXsugarAddress } from 'utils/addressHelpers'
import useGasBoost from './useGasBoost'
import { useMasterchef, useSugarswapVault, useSugar, useSousChef, useLottery, useERC20 } from './useContract'

// Approve a Farm
export const useApprove = (lpContract: Contract) => {
  const dispatch = useDispatch()
  const { account } = useWeb3React()
  const masterChefContract = useMasterchef()
  const { gasBoostedPrice } = useGasBoost()

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(lpContract, masterChefContract, account, gasBoostedPrice)
      dispatch(fetchFarmUserDataAsync(account))
      return tx
    } catch (e) {
      return false
    }
  }, [account, dispatch, lpContract, masterChefContract, gasBoostedPrice])

  return { onApprove: handleApprove }
}

// Approve a Vault
export const useApproveVault = (lpContract: Contract, vaultAddress: string) => {
  const dispatch = useDispatch()
  const { account } = useWeb3React()
  const sugarswapVaultContract = useSugarswapVault(vaultAddress)
  const { gasBoostedPrice } = useGasBoost()

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approveVault(lpContract, sugarswapVaultContract, account, gasBoostedPrice)
      dispatch(fetchVaultUserDataAsync(account))
      return tx
    } catch (e) {
      return false
    }
  }, [account, dispatch, lpContract, sugarswapVaultContract, gasBoostedPrice])

  return { onApprove: handleApprove }
}

// Approve a Pool
export const useSousApprove = (lpContract: Contract, sousId) => {
  const dispatch = useDispatch()
  const { account } = useWeb3React()
  const sousChefContract = useSousChef(sousId)
  const masterChefContract = useMasterchef()
  const { gasBoostedPrice } = useGasBoost()

  const handleApprove = useCallback(async () => {
    try {
      let tx
      if ([0, 8].includes(sousId)) {
        tx = await approve(lpContract, masterChefContract, account, gasBoostedPrice)
      } else {
        tx = await approve(lpContract, sousChefContract, account, gasBoostedPrice)
      }

      dispatch(updateUserAllowance(sousId, account))
      return tx
    } catch (e) {
      return false
    }
  }, [account, dispatch, lpContract, sousChefContract, masterChefContract, sousId, gasBoostedPrice])

  return { onApprove: handleApprove }
}

// Approve the lottery
export const useLotteryApprove = () => {
  const { account } = useWeb3React()
  const sugarContract = useSugar()
  const lotteryContract = useLottery()
  const { gasBoostedPrice } = useGasBoost()

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(sugarContract, lotteryContract, account, gasBoostedPrice)
      return tx
    } catch (e) {
      return false
    }
  }, [account, sugarContract, lotteryContract, gasBoostedPrice])

  return { onApprove: handleApprove }
}

// Approve an IFO
export const useIfoApprove = (tokenContract: Contract, spenderAddress: string) => {
  const { account } = useWeb3React()
  const { gasBoostedPrice } = useGasBoost()

  const onApprove = useCallback(async () => {
    const tx = await tokenContract.methods
      .approve(spenderAddress, ethers.constants.MaxUint256)
      .send({ from: account, gasPrice: gasBoostedPrice })
    return tx
  }, [account, spenderAddress, tokenContract, gasBoostedPrice])

  return onApprove
}

// Approve an IFO
export const useXsugarApprove = () => {
  const { gasBoostedPrice } = useGasBoost()

  const { account } = useWeb3React()
  const tokenContract = useERC20(getSugarAddress())
  const onApprove = useCallback(async () => {
    const tx = await tokenContract.methods
      .approve(getXsugarAddress(), ethers.constants.MaxUint256)
      .send({ from: account, gasPrice: gasBoostedPrice })
    return tx
  }, [account, tokenContract, gasBoostedPrice])

  return onApprove
}
