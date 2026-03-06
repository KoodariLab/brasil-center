import { ApolloClient, InMemoryCache } from '@apollo/client/core'

export default defineNuxtPlugin(nuxtApp => {
  const apolloClient = new ApolloClient({
    uri: '/api/graphql', // Aponta para o proxy local
    cache: new InMemoryCache(),
  })

  nuxtApp.provide('apollo', apolloClient)
})