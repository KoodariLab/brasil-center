import fs from 'node:fs'
import path from 'node:path'
import https from 'node:https'
import http from 'node:http'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const BASE = (process.env.PAGEBY_DOWNLOAD_BASE_URL || '').replace(/\/?$/, '') + '/'
const REPLACE_WITH = '/uploads/'
const PUBLIC_UPLOADS = path.join(__dirname, '..', 'public', 'uploads')

function collectUrls (obj, out = new Set()) {
  if (typeof obj === 'string') {
    if (BASE.length > 1 && obj.startsWith(BASE)) out.add(obj)
    return
  }
  if (Array.isArray(obj)) {
    obj.forEach(item => collectUrls(item, out))
    return
  }
  if (obj && typeof obj === 'object') {
    Object.values(obj).forEach(v => collectUrls(v, out))
  }
}

function download (url) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http
    protocol.get(url, { timeout: 15000 }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return download(res.headers.location).then(resolve).catch(reject)
      }
      if (res.statusCode !== 200) {
        reject(new Error(`${url} -> ${res.statusCode}`))
        return
      }
      const chunks = []
      res.on('data', (chunk) => chunks.push(chunk))
      res.on('end', () => resolve(Buffer.concat(chunks)))
      res.on('error', reject)
    }).on('error', reject)
  })
}

function replaceUrls (obj) {
  if (typeof obj === 'string') {
    if (BASE.length > 1 && obj.startsWith(BASE)) return REPLACE_WITH + obj.slice(BASE.length)
    return obj
  }
  if (Array.isArray(obj)) return obj.map(replaceUrls)
  if (obj && typeof obj === 'object') {
    const out = {}
    for (const k of Object.keys(obj)) out[k] = replaceUrls(obj[k])
    return out
  }
  return obj
}

async function main () {
  if (!process.env.PAGEBY_DOWNLOAD_BASE_URL) {
    console.error('PAGEBY_DOWNLOAD_BASE_URL não definido. Use para baixar mídias de uma URL externa e trocar por /uploads/ nos JSON.')
    console.error('Exemplo: PAGEBY_DOWNLOAD_BASE_URL=https://seu-dominio.com/wp-content/uploads node scripts/download-pageby-media.js')
    process.exit(1)
  }

  const files = [
    path.join(__dirname, '..', 'content', 'pageBy', 'home.json'),
    path.join(__dirname, '..', 'content', 'pageBy', 'sobre-bcc.json'),
    path.join(__dirname, '..', 'content', 'pageBy', 'jeito-bcc.json'),
    path.join(__dirname, '..', 'content', 'pageBy', 'pageBy.json')
  ]

  const allUrls = new Set()
  const raw = {}
  for (const f of files) {
    raw[f] = JSON.parse(fs.readFileSync(f, 'utf8'))
    collectUrls(raw[f], allUrls)
  }

  const urls = [...allUrls]
  console.log('Found ' + urls.length + ' unique media URLs to download.')

  for (const url of urls) {
    const rel = url.slice(BASE.length)
    const dest = path.join(PUBLIC_UPLOADS, rel)
    const dir = path.dirname(dest)
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
    if (fs.existsSync(dest)) {
      console.log('Skip (exists): ' + rel)
      continue
    }
    try {
      const buf = await download(url)
      fs.writeFileSync(dest, buf)
      console.log('OK: ' + rel)
    } catch (e) {
      console.error('FAIL: ' + rel, e.message)
    }
  }

  for (const f of files) {
    const updated = replaceUrls(raw[f])
    fs.writeFileSync(f, JSON.stringify(updated, null, 2))
    console.log('Updated: ' + path.basename(f))
  }

  console.log('Done.')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
