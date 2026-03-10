import { Link } from 'react-router-dom'
import { Search, Heart, Calendar, MapPin } from 'lucide-react'

export function ManagePage() {
  return (
    <div className="min-h-screen bg-navy">
      {/* Header */}
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
        {/* 검색 조건 */}
        <section className="mb-16">
          <h2 className="flex items-center gap-2 text-lg font-medium text-white mb-4">
            <Search className="w-5 h-5 text-amber-accent" aria-hidden />
            검색 조건
          </h2>
          <div className="rounded-lg border border-warmgray/40 bg-navy-light/60 p-6">
            <p className="text-sm text-warmgray-light mb-4">
              지역, 유찰횟수, 기일 등으로 물건을 검색합니다. (크롤링 연동 후 활성화)
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs text-warmgray mb-1">지역</label>
                <input
                  type="text"
                  placeholder="예: 서울송파"
                  className="w-full px-3 py-2 rounded-md bg-navy border border-warmgray/40 text-white placeholder-warmgray text-sm"
                  disabled
                />
              </div>
              <div>
                <label className="block text-xs text-warmgray mb-1">유찰 횟수</label>
                <input
                  type="text"
                  placeholder="예: 1~3"
                  className="w-full px-3 py-2 rounded-md bg-navy border border-warmgray/40 text-white placeholder-warmgray text-sm"
                  disabled
                />
              </div>
            </div>
          </div>
        </section>

        {/* 저장된 물건 */}
        <section className="mb-16">
          <h2 className="flex items-center gap-2 text-lg font-medium text-white mb-4">
            <MapPin className="w-5 h-5 text-amber-accent" aria-hidden />
            저장된 물건
          </h2>
          <div className="rounded-lg border border-warmgray/40 bg-navy-light/60 p-8 text-center">
            <p className="text-warmgray-light text-sm">
              아직 저장된 물건이 없습니다. 검색 후 물건을 저장하세요.
            </p>
          </div>
        </section>

        {/* 관심 물건 */}
        <section className="mb-16">
          <h2 className="flex items-center gap-2 text-lg font-medium text-white mb-4">
            <Heart className="w-5 h-5 text-amber-accent" aria-hidden />
            관심 물건
          </h2>
          <div className="rounded-lg border border-warmgray/40 bg-navy-light/60 p-8 text-center">
            <p className="text-warmgray-light text-sm">
              관심 표시한 물건이 여기에 표시됩니다.
            </p>
          </div>
        </section>

        {/* 스케줄 관리 */}
        <section>
          <h2 className="flex items-center gap-2 text-lg font-medium text-white mb-4">
            <Calendar className="w-5 h-5 text-amber-accent" aria-hidden />
            스케줄 관리
          </h2>
          <div className="rounded-lg border border-warmgray/40 bg-navy-light/60 p-8 text-center">
            <p className="text-warmgray-light text-sm">
              정기 검색 스케줄을 설정하면 자동으로 물건을 수집합니다.
            </p>
          </div>
        </section>
      </main>
    </div>
  )
}
