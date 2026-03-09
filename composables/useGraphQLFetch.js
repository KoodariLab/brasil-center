function getPageFromKey (key) {
  if (!key) return 'home'
  if (key.startsWith('home')) return 'home'
  if (key.startsWith('sobre')) return 'sobre-bcc'
  if (key.startsWith('jeitoBcc')) return 'jeito-bcc'
  return 'home'
}

/** Carrega conteúdo estático de content/pageBy (home, sobre-bcc, jeito-bcc). */
export const useGraphQLFetch = (query, variables = {}, key = '') => {
  const page = getPageFromKey(key)
  const fetchKey = `pageBy-${page}`
  const { data, pending, error } = useAsyncData(fetchKey, () => $fetch(`/api/pageby/${page}`))
  return { data, pending, error }
}
