import styled from 'styled-components'

interface IfoCardWrapperProps {
  isSingle?: boolean
}

const IfoCardWrapper = styled.div<IfoCardWrapperProps>`
  align-items: start;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 32px;
  padding-bottom: 40px;
  padding-top: 40px;
  padding-right: 60px;

  ${({ theme }) => theme.mediaQueries.md} {
    grid-template-columns: ${({ isSingle }) => `repeat(${isSingle ? 1 : 2}, 1fr)`};
  }

  @media (max-width: 767px) {
    padding-bottom: 30px;
    padding-top: 30px;
    padding-right: 0px;
  }
`

IfoCardWrapper.defaultProps = {
  isSingle: false,
}

export default IfoCardWrapper
