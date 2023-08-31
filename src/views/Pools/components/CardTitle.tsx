import styled from 'styled-components'

interface StyledTitleProps {
  isFinished?: boolean
}

const CardTitle = styled.div<StyledTitleProps>`
  color: ${({ isFinished, theme }) => theme.colors[isFinished ? 'textDisabled' : 'text']};
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 140%;
  margin-left: 6px;
`

export default CardTitle
