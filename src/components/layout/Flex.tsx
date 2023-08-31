import styled from 'styled-components'

const FlexLayout = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  & > * {
    min-width: 280px;
    max-width: 50%;
    width: 100%;
    margin-bottom: 32px;
    ${({ theme }) => theme.mediaQueries.xl} {
      max-width: 49%;
      min-width: 180px;
    }

    @media (max-width: 767px) {
      max-width: 100%;
    }
  }
`

export default FlexLayout
