/**
 * 지지옥션(ggi.co.kr) 종합검색 크롤러
 * Playwright로 로그인 후 검색 폼 입력 및 결과 파싱
 *
 * 폼 매핑: ggi.co.kr 종합검색 페이지 HTML 구조에 맞게
 * input/select name, id, label 등을 수정해야 할 수 있음.
 */
import { chromium } from 'playwright'
import { SEARCH_CONFIG } from './search-config.js'
import { upsertProperties } from '../db/schema.js'

const GGI_BASE = 'https://www.ggi.co.kr'
const TOTAL_SEARCH_URL = `${GGI_BASE}/search/total_search.asp`

/**
 * 로그인 시도
 * ggi.co.kr 로그인은 pop_login.asp 팝업에서 진행
 */
async function login(page, { id: ggiId, pw: ggiPw }) {
  const loginUrl = `${GGI_BASE}/login/pop_login.asp`
  await page.goto(loginUrl, { waitUntil: 'domcontentloaded', timeout: 30000 })
  await page.waitForLoadState('networkidle').catch(() => {})
  await page.waitForTimeout(1500)

  // 로그인 폼 - 다양한 selector 시도 (팝업 페이지 구조)
  const selectors = [
    'input[name="user_id"], input[name="member_id"], input[id="user_id"], input[id="userid"]',
    'input[name="user_pw"], input[name="member_pw"], input[id="user_pw"], input[id="userpw"], input[type="password"]'
  ]
  const idInput = page.locator(selectors[0]).first()
  const pwInput = page.locator(selectors[1]).first()

  const idVisible = await idInput.isVisible().catch(() => false)
  const pwVisible = await pwInput.isVisible().catch(() => false)

  if (idVisible && pwVisible) {
    await idInput.fill(ggiId)
    await pwInput.fill(ggiPw)
  } else {
    const anyId = page.locator('input[type="text"]:not([type="hidden"])').first()
    const anyPw = page.locator('input[type="password"]').first()
    if (await anyId.isVisible().catch(() => false) && await anyPw.isVisible().catch(() => false)) {
      await anyId.fill(ggiId)
      await anyPw.fill(ggiPw)
    } else {
      throw new Error('로그인 폼을 찾을 수 없습니다. ggi.co.kr 페이지 구조가 변경되었을 수 있습니다.')
    }
  }

  const submitBtn = page.locator('button[type="submit"], input[type="submit"], input[type="image"], a:has-text("로그인"), .btn_login').first()
  await submitBtn.click().catch(() => page.keyboard.press('Enter'))
  await page.waitForTimeout(2500)
}

/**
 * 종합검색 페이지에서 검색 조건 설정 및 실행
 * 실제 select/checkbox selector는 total_search.asp 구조에 맞게 수정 필요
 */
async function fillSearchForm(page) {
  await page.goto(TOTAL_SEARCH_URL, { waitUntil: 'domcontentloaded', timeout: 30000 })
  await page.waitForLoadState('networkidle').catch(() => {})
  await page.waitForTimeout(1500)

  // 지역: 인천시 부평구 - select 또는 cascading select
  const regionSelect = page.locator('select[name*="region"], select[name*="addr"], select[name*="sido"], select[name*="gugun"], select[id*="region"]').first()
  if (await regionSelect.isVisible().catch(() => false)) {
    await regionSelect.selectOption({ label: /부평|인천/ }).catch(() => {})
  }

  // 유찰수: 2회
  const failedSelect = page.locator('select[name*="유찰"], select[name*="fail"], select[name*="chul"]').first()
  if (await failedSelect.isVisible().catch(() => false)) {
    await failedSelect.selectOption({ label: /2\s*회|2회/ }).catch(() => {})
  }

  // 용도: 연립, 다세대, 연립(생활주택), 다세대(생활주택) checkbox
  for (const usage of SEARCH_CONFIG.usageTypes) {
    const cb = page.locator(`input[type="checkbox"][value*="${usage}"], label:has-text("${usage}")`).first()
    if (await cb.isVisible().catch(() => false)) {
      await cb.check().catch(() => {})
    }
  }

  // 검색 버튼 클릭
  const searchBtn = page.locator('button:has-text("검색"), input[type="submit"][value*="검색"], a:has-text("검색")').first()
  await searchBtn.click().catch(() => {
    throw new Error('검색 버튼을 찾을 수 없습니다.')
  })
  await page.waitForTimeout(3000)
}

/**
 * 검색 결과 페이지에서 물건 목록 파싱
 * 실제 결과 테이블/리스트 selector 수정 필요
 */
async function parseResults(page) {
  const results = []

  // 결과 테이블 또는 리스트 - ggi.co.kr 구조에 맞게 조정
  const rows = page.locator('table tbody tr, .search-list li, .result-list .item, [class*="result"] tr')
  const count = await rows.count()

  for (let i = 0; i < Math.min(count, 100); i++) {
    const row = rows.nth(i)
    const text = await row.textContent().catch(() => '')
    if (!text || text.trim().length < 10) continue

    // 사건번호, 주소, 법원 등 추출 - 셀 구조에 맞게 조정
    const cells = await row.locator('td, .cell').allTextContents().catch(() => [])
    const id = cells[0]?.trim() || `row-${i}-${Date.now()}`

    results.push({
      id,
      address: cells[1] ?? cells[2] ?? null,
      court: cells[2] ?? cells[3] ?? null,
      appraisal_value: parsePrice(cells[3] ?? cells[4]),
      lowest_bid: parsePrice(cells[4] ?? cells[5]),
      auction_date: parseDate(cells[5] ?? cells[6]),
      failed_bids: parseInt(cells[6] ?? cells[7] ?? '0', 10) || null,
      usage_type: cells[7] ?? cells[8] ?? null,
      raw_json: text
    })
  }

  return results
}

function parsePrice(str) {
  if (!str || typeof str !== 'string') return null
  const n = str.replace(/[^0-9]/g, '')
  return n ? parseInt(n, 10) : null
}

function parseDate(str) {
  if (!str || typeof str !== 'string') return null
  const m = str.match(/\d{4}[-./]\d{1,2}[-./]\d{1,2}/)
  return m ? m[0].replace(/\./g, '-') : null
}

/**
 * 크롤 실행 진입점
 */
export async function runCrawl() {
  const ggiId = process.env.GGI_ID
  const ggiPw = process.env.GGI_PW

  if (!ggiId || !ggiPw) {
    throw new Error('GGI_ID, GGI_PW 환경변수를 설정하세요.')
  }

  let browser
  try {
    browser = await chromium.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    })

    const context = await browser.newContext({
      locale: 'ko-KR',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      viewport: { width: 1280, height: 800 }
    })
    const page = await context.newPage()

    await login(page, { id: ggiId, pw: ggiPw })
    await fillSearchForm(page)
    const properties = await parseResults(page)

    if (properties.length > 0) {
      const inserted = upsertProperties(properties)
      console.log(`크롤 완료: ${properties.length}건 파싱, ${inserted}건 DB 반영`)
      return { count: properties.length }
    }

    // 폼 구조가 다를 경우 빈 결과 - 에러 대신 경고
    console.warn('파싱된 물건이 없습니다. total_search.asp HTML 구조를 확인하고 crawler/ggi.js selector를 수정하세요.')
    return { count: 0 }
  } finally {
    if (browser) await browser.close()
  }
}
