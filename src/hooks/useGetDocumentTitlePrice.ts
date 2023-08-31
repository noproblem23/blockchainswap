import { useEffect } from 'react'

const useGetDocumentTitlePrice = () => {
  useEffect(() => {
    document.title = 'SugarSwap - ZkSync Era'
    // document.title = `SugarSwap - $${Number(cakePriceUsd).toLocaleString(undefined, {
    //   minimumFractionDigits: 3,
    //   maximumFractionDigits: 3,
    // })}`
  })
}
export default useGetDocumentTitlePrice
