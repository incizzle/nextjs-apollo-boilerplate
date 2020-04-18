import React, { useMemo } from 'react'
import Head from 'next/head'
import { ApolloProvider } from '@apollo/react-hooks'
import { ApolloClient, InMemoryCache, HttpLink, NormalizedCacheObject } from '@apollo/client'
import fetch from 'isomorphic-unfetch'
import config from '../../config'

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null

export function withApollo (PageComponent: any, { ssr = true } = {}) {
  const WithApollo = ({ apolloClient, apolloState, ...pageProps }: any) => {
    const client = useMemo(
      () => apolloClient || initApolloClient(apolloState),
      []
    )
    return (
      <ApolloProvider client={client}>
        <PageComponent {...pageProps} />
      </ApolloProvider>
    )
  }

  if (process.env.NODE_ENV !== 'production') {
    const displayName =
      PageComponent.displayName || PageComponent.name || 'Component'

    if (displayName === 'App') {
      console.warn('This withApollo HOC only works with PageComponents.')
    }

    WithApollo.displayName = `withApollo(${displayName})`
  }

  if (typeof window === 'undefined') {
    if (ssr) {
      WithApollo.getInitialProps = async (ctx: any) => {
        const { AppTree } = ctx

        let pageProps = {}
        if (PageComponent.getInitialProps) {
          pageProps = await PageComponent.getInitialProps(ctx)
        }

        const apolloClient = initApolloClient()

        try {
          await require('@apollo/react-ssr').getDataFromTree(
            <AppTree
              pageProps={{
                ...pageProps,
                apolloClient
              }}
            />
          )
        } catch (error) {
          console.error('Error while running `getDataFromTree`', error)
        }

        Head.rewind()

        const apolloState = apolloClient.cache.extract()

        return {
          ...pageProps,
          apolloState
        }
      }
    }
  }

  return WithApollo
}

function initApolloClient (initialState?: any) {
  if (typeof window === 'undefined') {
    return createApolloClient(initialState)
  }

  if (!apolloClient) {
    apolloClient = createApolloClient(initialState)
  }

  return apolloClient
}

function createApolloClient (initialState = {}) {
  const isBrowser = typeof window !== 'undefined'
  return new ApolloClient({
    connectToDevTools: isBrowser,
    ssrMode: !isBrowser,
    link: new HttpLink({
      uri: config.graphql.url,
      credentials: 'same-origin',
      //@ts-ignore
      fetch: !isBrowser && fetch
    }),
    cache: new InMemoryCache().restore(initialState)
  })
}