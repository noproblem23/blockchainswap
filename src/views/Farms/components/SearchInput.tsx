import { useTranslation } from 'contexts/Localization'
import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import { Input } from 'sugarswap-uikit'

const StyledInput = styled(Input)`
  border: 1px solid rgba(255, 255, 255, 0.2);
  margin-left: auto;
  font-weight: 700;
  font-size: 14px;
  height: 34px;
  color: ${({ theme }) => theme.colors.textSubtle};
`

const InputWrapper = styled.div`
  position: relative;
  ${({ theme }) => theme.mediaQueries.sm} {
    width: 188px;
    display: block;
  }
`

const Container = styled.div<{ toggled: boolean }>``

interface Props {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const SearchInput: React.FC<Props> = ({ value, onChange }) => {
  const [toggled, setToggled] = useState(false)
  const inputEl = useRef(null)
  const { t } = useTranslation()

  return (
    <Container toggled={toggled}>
      <InputWrapper>
        <StyledInput
          ref={inputEl}
          value={value}
          onChange={onChange}
          placeholder={t('Search')}
          onBlur={() => setToggled(false)}
        />
      </InputWrapper>
    </Container>
  )
}

export default SearchInput
