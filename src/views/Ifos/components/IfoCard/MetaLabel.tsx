import React from 'react'
import { Box, BoxProps, Text } from 'sugarswap-uikit'

type MetaLabel = BoxProps

const MetaLabel: React.FC<BoxProps> = ({ children, ...props }: any) => {
  return (
    <Box minHeight="18px" {...props}>
      <Text color="textSubtle" fontSize="12px">
        {children}
      </Text>
    </Box>
  )
}

export default MetaLabel
