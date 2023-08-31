import Web3 from 'web3'
import { AbiItem } from 'web3-utils'
import web3NoAccount from 'utils/web3'
import { poolsConfig } from 'config/constants'
import { PoolCategory } from 'config/constants/types'

// Addresses
import {
  getAddress,
  getPancakeProfileAddress,
  getPancakeRabbitsAddress,
  getBunnyFactoryAddress,
  getBunnySpecialAddress,
  getSugarAddress,
  getLotteryAddress,
  getLotteryTicketAddress,
  getMasterChefAddress,
  getMultiAddress,
  getPointCenterIfoAddress,
  getClaimRefundAddress,
  getXsugarAddress,
  getFactoryAddress,
  getNftMarketplaceAddress,
  getWcoreAddress,
  getHunterAddress,
  getKyudoNftAddress,
} from 'utils/addressHelpers'

// ABI
import profileABI from 'config/abi/pancakeProfile.json'
import pancakeRabbitsAbi from 'config/abi/pancakeRabbits.json'
import bunnyFactoryAbi from 'config/abi/bunnyFactory.json'
import bunnySpecialAbi from 'config/abi/bunnySpecial.json'
import bep20Abi from 'config/abi/erc20.json'
import sugarAbi from 'config/abi/sugar.json'
import ifoAbi from 'config/abi/ifo.json'
import pointCenterIfo from 'config/abi/pointCenterIfo.json'
import lotteryAbi from 'config/abi/lottery.json'
import lotteryTicketAbi from 'config/abi/lotteryNft.json'
import masterChef from 'config/abi/masterchef.json'
import multi from 'config/abi/multiSender.json'
import anyswapV5Router from 'config/abi/anyswapV5Router.json'
import sugarswapStrategy from 'config/abi/sugarswapStrategy.json'
import sugarswapVault from 'config/abi/sugarswapVault.json'
import sousChef from 'config/abi/sousChef.json'
import sousChefBnb from 'config/abi/sousChefBnb.json'
import claimRefundAbi from 'config/abi/claimRefund.json'
import xsugarAbi from 'config/abi/xsugar.json'
import factoryAbi from 'config/abi/factory.json'
import erc721Abi from 'config/abi/erc721.json'
import nftMarketplaceAbi from 'config/abi/nftMarketplace.json'
import wcoreABI from 'config/abi/wcore.json'
import hunterABI from 'config/abi/hunter.json'
import nftABI from 'config/abi/NFT.json'

const getContract = (abi: any, address: string, web3?: Web3) => {
  const _web3 = web3 ?? web3NoAccount
  return new _web3.eth.Contract((abi as unknown) as AbiItem, address)
}

export const getBep20Contract = (address: string, web3?: Web3) => {
  return getContract(bep20Abi, address, web3)
}
export const getIfoContract = (address: string, web3?: Web3) => {
  return getContract(ifoAbi, address, web3)
}
export const getSouschefContract = (id: number, web3?: Web3) => {
  const config = poolsConfig.find((pool) => pool.sousId === id)
  const abi = config.poolCategory === PoolCategory.CORE ? sousChefBnb : sousChef
  return getContract(abi, getAddress(config.contractAddress), web3)
}
export const getPointCenterIfoContract = (web3?: Web3) => {
  return getContract(pointCenterIfo, getPointCenterIfoAddress(), web3)
}
export const getSugarContract = (web3?: Web3) => {
  return getContract(sugarAbi, getSugarAddress(), web3)
}
export const getProfileContract = (web3?: Web3) => {
  return getContract(profileABI, getPancakeProfileAddress(), web3)
}
export const getPancakeRabbitContract = (web3?: Web3) => {
  return getContract(pancakeRabbitsAbi, getPancakeRabbitsAddress(), web3)
}
export const getBunnyFactoryContract = (web3?: Web3) => {
  return getContract(bunnyFactoryAbi, getBunnyFactoryAddress(), web3)
}
export const getBunnySpecialContract = (web3?: Web3) => {
  return getContract(bunnySpecialAbi, getBunnySpecialAddress(), web3)
}
export const getLotteryContract = (web3?: Web3) => {
  return getContract(lotteryAbi, getLotteryAddress(), web3)
}
export const getLotteryTicketContract = (web3?: Web3) => {
  return getContract(lotteryTicketAbi, getLotteryTicketAddress(), web3)
}
export const getMasterchefContract = (web3?: Web3) => {
  return getContract(masterChef, getMasterChefAddress(), web3)
}
export const getMutiContract = (web3?: Web3) => {
  return getContract(multi, getMultiAddress(), web3)
}
export const getAnyswapV5RouterContract = (web3?: Web3, routerAddress?: string) => {
  return getContract(anyswapV5Router, routerAddress, web3)
}
export const getSugarswapStrategyContract = (web3?: Web3, strategyAddress?: string) => {
  return getContract(sugarswapStrategy, strategyAddress, web3)
}
export const getSugarswapVaultContract = (web3?: Web3, vaultAddress?: string) => {
  // const vaultInfo = vaultsConfig.find((v) => getAddress(v.vaultAddresses) === vaultAddress)
  return getContract(sugarswapVault, vaultAddress, web3)
}
export const getClaimRefundContract = (web3?: Web3) => {
  return getContract(claimRefundAbi, getClaimRefundAddress(), web3)
}
export const getXsugarContract = (web3?: Web3) => {
  return getContract(xsugarAbi, getXsugarAddress(), web3)
}
export const getFactoryContract = (web3?: Web3) => {
  return getContract(factoryAbi, getFactoryAddress(), web3)
}
export const getErc721Contract = (address: string, web3?: Web3) => {
  return address ? getContract(erc721Abi, address, web3) : null
}
export const getNftMarketplaceContract = (web3?: Web3) => {
  return getContract(nftMarketplaceAbi, getNftMarketplaceAddress(), web3)
}
export const getWcoreContract = (web3?: Web3) => {
  return getContract(wcoreABI, getWcoreAddress(), web3)
}
export const getHunterContract = (web3?: Web3) => {
  return getContract(hunterABI, getHunterAddress(), web3)
}
export const getKyudoNftContract = (web3?: Web3) => {
  return getContract(nftABI, getKyudoNftAddress(), web3)
}
