import { useLoadingStore } from '~/stores/loading'

export const useGraphQLFetch = (query, variables = {}, key = '') => {
  // const loadingStore = useLoadingStore()
  // loadingStore.startLoading()

  const { data, pending, error } = useFetch('/api/graphql', {
    key,
    method: 'POST',
    body: { query, variables },
    swr: true,
    default: () => null,
    onResponse() {
      // loadingStore.stopLoading()
    },
    onResponseError() {
      // loadingStore.stopLoading()
    }
  })

  setTimeout(() => {
    // loadingStore.stopLoading()
  }, 500)

  return { data, pending, error }
}

