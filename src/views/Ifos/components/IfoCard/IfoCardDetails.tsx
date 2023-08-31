import React, { useState } from 'react'
// import styled from 'styled-components'
import { Ifo } from 'config/constants/types'
import { useTranslation } from 'contexts/Localization'
import { Button, CardFooter, ChevronDownIcon, ChevronUpIcon, Text } from 'sugarswap-uikit'
import { PublicIfoState } from '../../hooks/useGetPublicIfoData'

export interface IfoCardDetailsProps {
  ifo: Ifo
  publicIfoData: PublicIfoState
}

const IfoCardDetails: React.FC<IfoCardDetailsProps> = ({ ifo }) => {
  const [isOpen, setIsOpen] = useState(false)
  const { t } = useTranslation()
  const { description } = ifo
  const handleToggle = () => setIsOpen(!isOpen)

  return (
    <CardFooter style={{ padding: '0px 16px' }}>
      <Button
        variant="text"
        onClick={handleToggle}
        width="100%"
        endIcon={
          isOpen ? <ChevronUpIcon color="primary" width="24px" /> : <ChevronDownIcon color="primary" width="24px" />
        }
        style={{ fontSize: '12px', fontWeight: '700' }}
      >
        {isOpen ? t('Hide') : t('Details')}
      </Button>
      {isOpen && (
        <>
          <Text as="p" color="textSubtle" mb="30px" mt="5px" fontSize="14px">
            {t(description)}
          </Text>
        </>
      )}
    </CardFooter>
  )
}

export default IfoCardDetails
