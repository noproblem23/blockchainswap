import { useMemo } from 'react'
import useWeb3 from 'hooks/useWeb3'
import {
  getBep20Contract,
  getSugarContract,
  getBunnyFactoryContract,
  getBunnySpecialContract,
  getPancakeRabbitContract,
  getProfileContract,
  getIfoContract,
  getMutiContract,
  getAnyswapV5RouterContract,
  getLotteryContract,
  getLotteryTicketContract,
  getMasterchefContract,
  getSugarswapStrategyContract,
  getSugarswapVaultContract,
  getPointCenterIfoContract,
  getSouschefContract,
  getClaimRefundContract,
  getXsugarContract,
  getErc721Contract,
  getNftMarketplaceContract,
  getWcoreContract,
  getHunterContract,
  getKyudoNftContract,
} from 'utils/contractHelpers'

/**
 * Helper hooks to get specific contracts (by ABI)
 */

export const useIfoContract = (address: string) => {
  const web3 = useWeb3()
  return useMemo(() => getIfoContract(address, web3), [address, web3])
}

export const useERC20 = (address: string) => {
  const web3 = useWeb3()
  return useMemo(() => getBep20Contract(address, web3), [address, web3])
}
export const useWcore = () => {
  const web3 = useWeb3()
  return useMemo(() => getWcoreContract(web3), [web3])
}
export const useSugar = () => {
  const web3 = useWeb3()
  return useMemo(() => getSugarContract(web3), [web3])
}

export const useBunnyFactory = () => {
  const web3 = useWeb3()
  return useMemo(() => getBunnyFactoryContract(web3), [web3])
}

export const usePancakeRabbits = () => {
  const web3 = useWeb3()
  return useMemo(() => getPancakeRabbitContract(web3), [web3])
}

export const useProfile = () => {
  const web3 = useWeb3()
  return useMemo(() => getProfileContract(web3), [web3])
}

export const useLottery = () => {
  const web3 = useWeb3()
  return useMemo(() => getLotteryContract(web3), [web3])
}

export const useLotteryTicket = () => {
  const web3 = useWeb3()
  return useMemo(() => getLotteryTicketContract(web3), [web3])
}

export const useMasterchef = () => {
  const web3 = useWeb3()
  return useMemo(() => getMasterchefContract(web3), [web3])
}

export const useMuti = () => {
  const web3 = useWeb3()
  return useMemo(() => getMutiContract(web3), [web3])
}

export const useAnyswapV5 = (routerAddress: string) => {
  const web3 = useWeb3()
  return useMemo(() => getAnyswapV5RouterContract(web3, routerAddress), [web3, routerAddress])
}

export const useSugarswapStrategy = (strategyAddress: string) => {
  const web3 = useWeb3()
  return useMemo(() => getSugarswapStrategyContract(web3, strategyAddress), [web3, strategyAddress])
}

export const useSugarswapVault = (vaultAddress: string) => {
  const web3 = useWeb3()
  return useMemo(() => getSugarswapVaultContract(web3, vaultAddress), [web3, vaultAddress])
}

export const useSousChef = (id) => {
  const web3 = useWeb3()
  return useMemo(() => getSouschefContract(id, web3), [id, web3])
}

export const usePointCenterIfoContract = () => {
  const web3 = useWeb3()
  return useMemo(() => getPointCenterIfoContract(web3), [web3])
}

export const useBunnySpecialContract = () => {
  const web3 = useWeb3()
  return useMemo(() => getBunnySpecialContract(web3), [web3])
}

export const useClaimRefundContract = () => {
  const web3 = useWeb3()
  return useMemo(() => getClaimRefundContract(web3), [web3])
}

export const useXsugar = () => {
  const web3 = useWeb3()
  return useMemo(() => getXsugarContract(web3), [web3])
}

export const useERC721 = (address: string) => {
  const web3 = useWeb3()
  return useMemo(() => getErc721Contract(address, web3), [address, web3])
}

export const useMarketplace = () => {
  const web3 = useWeb3()
  return useMemo(() => getNftMarketplaceContract(web3), [web3])
}

export const useHunter = () => {
  const web3 = useWeb3()
  return useMemo(() => getHunterContract(web3), [web3])
}

export const useKyudoNft = () => {
  const web3 = useWeb3()
  return useMemo(() => getKyudoNftContract(web3), [web3])
}
