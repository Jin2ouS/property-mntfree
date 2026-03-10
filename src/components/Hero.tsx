import { Link } from 'react-router-dom'

export function Hero() {
  return (
    <header className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Background: grid/network pattern */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(212, 212, 212, 0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(212, 212, 212, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-navy via-navy to-navy-light" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(217,119,6,0.12),transparent)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-white tracking-tight max-w-4xl mx-auto leading-tight">
          부동산 투자 판단을 위한
          <br />
          <span className="text-amber-accent">구조화된 시스템</span>
        </h1>
        <p className="mt-6 text-lg sm:text-xl text-warmgray-light max-w-2xl mx-auto">
          경매 물건 탐색, 입찰 전 분석, 수익 구조 검토, 매도 전략까지. 판단을 위한 도구와 흐름을 제공합니다.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row flex-wrap gap-4 justify-center">
          <a
            href="#workflow"
            className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-amber-accent text-white font-medium hover:bg-amber-hover transition-colors"
          >
            서비스 흐름 보기
          </a>
          <a
            href="#what-we-do"
            className="inline-flex items-center justify-center px-6 py-3 rounded-md border border-warmgray text-warmgray-light font-medium hover:border-warmgray-light hover:text-white transition-colors"
          >
            무엇을 하는지 보기
          </a>
          <Link
            to="/manage"
            className="inline-flex items-center justify-center px-6 py-3 rounded-md border border-warmgray text-warmgray-light font-medium hover:border-warmgray-light hover:text-white transition-colors"
          >
            물건 관리
          </Link>
        </div>
      </div>
    </header>
  );
}
