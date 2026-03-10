import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Search, Heart, Calendar, MapPin, RefreshCw } from 'lucide-react'

const API_BASE = import.meta.env.VITE_API_URL || ''

interface SearchConfig {
  region: string
  failedBids: number
  usageTypes: string[]
}

interface Property {
  id: string
  address: string | null
  court: string | null
  appraisal_value: number | null
  lowest_bid: number | null
  auction_date: string | null
  failed_bids: number | null
  usage_type: string | null
  created_at: string
}

export function ManagePage() {
  const [searchConfig, setSearchConfig] = useState<SearchConfig | null>(null)
  const [properties, setProperties] = useState<Property[]>([])
  const [favorites, setFavorites] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [crawlLoading, setCrawlLoading] = useState(false)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      setError(null)
      try {
        const [configRes, propsRes, favRes] = await Promise.all([
          fetch(`${API_BASE}/api/search-config`).catch(() => null),
          fetch(`${API_BASE}/api/properties`).catch(() => null),
          fetch(`${API_BASE}/api/favorites`).catch(() => null),
        ])
        if (configRes?.ok) setSearchConfig(await configRes.json())
        if (propsRes?.ok) setProperties(await propsRes.json())
        else setProperties([])
        if (favRes?.ok) setFavorites(await favRes.json())
        else setFavorites([])
      } catch (e) {
        setError('API 연결 실패. 백엔드 서버를 확인하세요.')
        setProperties([])
        setFavorites([])
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  async function handleCrawl() {
    setCrawlLoading(true)
    setError(null)
    try {
      const res = await fetch(`${API_BASE}/api/crawl`, { method: 'POST' })
      const data = await res.json().catch(() => ({}))
      if (res.ok) {
        if (data.count != null) {
          setProperties(await (await fetch(`${API_BASE}/api/properties`)).json())
        }
      } else {
        setError(data.error || '크롤 실행 실패')
      }
    } catch (e) {
      setError('크롤 요청 실패')
    } finally {
      setCrawlLoading(false)
    }
  }

  function formatPrice(n: number | null) {
    if (n == null) return '-'
    return new Intl.NumberFormat('ko-KR').format(n)
  }

  return (
    <div className="min-h-screen bg-navy">
      <header className="border-b border-warmgray/30 bg-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-white">물건 관리</h1>
          <Link
            to="/"
            className="text-sm text-warmgray-light hover:text-white transition-colors"
          >
            ← property.mntfree로
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {error && (
          <div className="mb-6 rounded-lg border border-amber-accent/50 bg-amber-accent/10 px-4 py-3 text-sm text-amber-accent">
            {error}
          </div>
        )}

        <section className="mb-16">
          <h2 className="flex items-center gap-2 text-lg font-medium text-white mb-4">
            <Search className="w-5 h-5 text-amber-accent" aria-hidden />
            검색 조건
          </h2>
          <div className="rounded-lg border border-warmgray/40 bg-navy-light/60 p-6">
            <p className="text-sm text-warmgray-light mb-4">
              지역, 유찰횟수, 용도로 물건을 검색합니다.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs text-warmgray mb-1">지역</label>
                <input
                  type="text"
                  value={searchConfig?.region ?? ''}
                  readOnly
                  className="w-full px-3 py-2 rounded-md bg-navy border border-warmgray/40 text-white text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-warmgray mb-1">유찰 횟수</label>
                <input
                  type="text"
                  value={searchConfig?.failedBids != null ? `${searchConfig.failedBids}회` : ''}
                  readOnly
                  className="w-full px-3 py-2 rounded-md bg-navy border border-warmgray/40 text-white text-sm"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs text-warmgray mb-1">용도</label>
                <input
                  type="text"
                  value={searchConfig?.usageTypes?.join(', ') ?? ''}
                  readOnly
                  className="w-full px-3 py-2 rounded-md bg-navy border border-warmgray/40 text-white text-sm"
                />
              </div>
            </div>
            <button
              onClick={handleCrawl}
              disabled={crawlLoading || loading}
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-md bg-amber-accent text-white text-sm font-medium hover:bg-amber-hover disabled:opacity-50 transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${crawlLoading ? 'animate-spin' : ''}`} aria-hidden />
              {crawlLoading ? '검색 중...' : '지금 검색'}
            </button>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="flex items-center gap-2 text-lg font-medium text-white mb-4">
            <MapPin className="w-5 h-5 text-amber-accent" aria-hidden />
            저장된 물건
          </h2>
          <div className="rounded-lg border border-warmgray/40 bg-navy-light/60 overflow-hidden">
            {loading ? (
              <div className="p-8 text-center text-warmgray-light text-sm">로딩 중...</div>
            ) : properties.length === 0 ? (
              <div className="p-8 text-center text-warmgray-light text-sm">
                아직 저장된 물건이 없습니다. 검색 후 물건을 저장하세요.
              </div>
            ) : (
              <ul className="divide-y divide-warmgray/30">
                {properties.map((p) => (
                  <li key={p.id} className="px-6 py-4 hover:bg-navy/40 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
                      <div>
                        <p className="text-white font-medium">{p.address ?? p.id}</p>
                        <p className="text-sm text-warmgray-light mt-1">
                          {p.court && `${p.court} · `}
                          {p.auction_date && `기일 ${p.auction_date}`}
                          {p.failed_bids != null && ` · 유찰 ${p.failed_bids}회`}
                        </p>
                      </div>
                      <div className="text-sm text-warmgray-light">
                        감정가 {formatPrice(p.appraisal_value)} / 최저가 {formatPrice(p.lowest_bid)}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="flex items-center gap-2 text-lg font-medium text-white mb-4">
            <Heart className="w-5 h-5 text-amber-accent" aria-hidden />
            관심 물건
          </h2>
          <div className="rounded-lg border border-warmgray/40 bg-navy-light/60 p-8 text-center">
            {loading ? (
              <p className="text-warmgray-light text-sm">로딩 중...</p>
            ) : favorites.length === 0 ? (
              <p className="text-warmgray-light text-sm">
                관심 표시한 물건이 여기에 표시됩니다.
              </p>
            ) : (
              <ul className="divide-y divide-warmgray/30 text-left">
                {favorites.map((p) => (
                  <li key={p.id} className="px-6 py-4">
                    <p className="text-white font-medium">{p.address ?? p.id}</p>
                    <p className="text-sm text-warmgray-light mt-1">
                      {p.court && `${p.court} · `}
                      {p.auction_date && `기일 ${p.auction_date}`}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        <section>
          <h2 className="flex items-center gap-2 text-lg font-medium text-white mb-4">
            <Calendar className="w-5 h-5 text-amber-accent" aria-hidden />
            스케줄 관리
          </h2>
          <div className="rounded-lg border border-warmgray/40 bg-navy-light/60 p-8 text-center">
            <p className="text-warmgray-light text-sm">
              정기 검색 스케줄을 설정하면 자동으로 물건을 수집합니다. (Railway Cron 등에서 POST /api/crawl 호출)
            </p>
          </div>
        </section>
      </main>
    </div>
  )
}
