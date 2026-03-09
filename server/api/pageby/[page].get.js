import homePageBy from '~/content/pageBy/home.json'
import sobreBccPageBy from '~/content/pageBy/sobre-bcc.json'
import jeitoBccPageBy from '~/content/pageBy/jeito-bcc.json'

const PAGES = {
  'home': homePageBy,
  'sobre-bcc': sobreBccPageBy,
  'jeito-bcc': jeitoBccPageBy
}

export default defineEventHandler((event) => {
  const page = getRouterParam(event, 'page')
  if (!page || !(page in PAGES)) {
    throw createError({ statusCode: 404, statusMessage: 'Page not found' })
  }
  return { data: { pageBy: PAGES[page] } }
})
