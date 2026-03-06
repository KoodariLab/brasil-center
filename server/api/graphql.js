import https from 'node:https'

const API_URL = 'https://www.brasilcenter.com.br/wordpress/graphql'

function fetchGraphQL(url, body, headers, rejectUnauthorized = false) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url)
    const postData = typeof body === 'string' ? body : JSON.stringify(body)
    const options = {
      hostname: parsed.hostname,
      port: parsed.port || 443,
      path: parsed.pathname + parsed.search,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
        ...headers
      },
      rejectUnauthorized
    }
    const req = https.request(options, (res) => {
      let data = ''
      res.on('data', (chunk) => { data += chunk })
      res.on('end', () => {
        try {
          resolve(JSON.parse(data))
        } catch {
          resolve(data)
        }
      })
    })
    req.on('error', reject)
    req.write(postData)
    req.end()
  })
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const config = useRuntimeConfig()
  const apiUrl = config.public?.apiUrl || API_URL
  const isDev = process.env.NODE_ENV !== 'production'
  const headers = getRequestHeaders(event)
  const cleanHeaders = {}
  if (headers['content-type']) cleanHeaders['Content-Type'] = headers['content-type']
  if (headers['authorization']) cleanHeaders['Authorization'] = headers['authorization']
  const response = await fetchGraphQL(apiUrl, body, cleanHeaders, !isDev)
  return response
})