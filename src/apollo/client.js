import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'

const CLIENT_SUGAR_URL = process.env.REACT_APP_CLIENT_SUGAR_URL
const CLIENT_BLOCK_URL = process.env.REACT_APP_CLIENT_BLOCK_URL

export const sugarClient = new ApolloClient({
  link: new HttpLink({
    uri: CLIENT_SUGAR_URL,
  }),
  cache: new InMemoryCache(),
  shouldBatch: true,
})

export const blockClient = new ApolloClient({
  link: new HttpLink({
    uri: CLIENT_BLOCK_URL,
  }),
  cache: new InMemoryCache(),
})

export const marketplaceClient = new ApolloClient({
  link: new HttpLink({
    uri: `https://nft.hakuswap.com/graphql`,
  }),
  cache: new InMemoryCache(),
})

export default sugarClient
