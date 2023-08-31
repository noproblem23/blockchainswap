/* eslint-disable react/react-in-jsx-scope */
import { ifosConfig } from 'config/constants'
import { useTranslation } from 'contexts/Localization'
import IfoCard from './components/IfoCard'
import IfoCards from './components/IfoCards'

const activeIfo = ifosConfig.find((ifo) => ifo.isActive)

const Ifo = () => {
  const { t } = useTranslation()

  if (!activeIfo) {
    return <></>
  }

  return (
    <div>
      <IfoCards isSingle>
        <IfoCard ifo={activeIfo} />
      </IfoCards>
    </div>
  )
}

export default Ifo
