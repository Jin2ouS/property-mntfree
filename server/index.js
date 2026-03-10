import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { getDb, listProperties, listFavorites } from './db/schema.js'
import { runCrawl } from './crawler/ggi.js'
import { SEARCH_CONFIG } from './crawler/search-config.js'

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

// 헬스체크
app.get('/api/health', (_, res) => {
  res.json({ ok: true, time: new Date().toISOString() })
})

// 검색 조건 (읽기 전용)
app.get('/api/search-config', (_, res) => {
  res.json({
    region: SEARCH_CONFIG.region,
    failedBids: SEARCH_CONFIG.failedBids,
    usageTypes: SEARCH_CONFIG.usageTypes
  })
})

// 저장된 물건 목록
app.get('/api/properties', (_, res) => {
  try {
    const rows = listProperties()
    res.json(rows)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to list properties' })
  }
})

// 관심 물건 목록
app.get('/api/favorites', (_, res) => {
  try {
    const rows = listFavorites()
    res.json(rows)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to list favorites' })
  }
})

// 수동 크롤 실행
app.post('/api/crawl', async (_, res) => {
  try {
    if (!process.env.GGI_ID || !process.env.GGI_PW) {
      return res.status(400).json({ error: 'GGI_ID, GGI_PW 환경변수 필요' })
    }
    const result = await runCrawl()
    res.json(result)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: err.message || 'Crawl failed' })
  }
})

// 서버 시작 시 DB 초기화
getDb()

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
})
