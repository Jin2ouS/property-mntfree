import { Search, FileSearch, BarChart3, Target } from 'lucide-react';

const items = [
  {
    icon: Search,
    title: '경매 물건 탐색',
    description: '법원 경매·공매 물건을 체계적으로 탐색하고 후보를 발굴합니다.',
  },
  {
    icon: FileSearch,
    title: '입찰 전 분석',
    description: '입찰 전 권리분석, 시세, 리스크를 구조적으로 검토합니다.',
  },
  {
    icon: BarChart3,
    title: '수익 구조 검토',
    description: '매입·보수·매도 단계별 수익 구조를 수치로 점검합니다.',
  },
  {
    icon: Target,
    title: '매도/보유 전략 점검',
    description: '즉시 매도·임대·보유 전환 등 목표에 맞는 전략을 정리합니다.',
  },
];

export function WhatWeDo() {
  return (
    <section id="what-we-do" className="py-20 sm:py-28 bg-navy-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-semibold text-white text-center">
          What We Do
        </h2>
        <p className="mt-4 text-warmgray-light text-center max-w-2xl mx-auto">
          부동산 경매·투자 실행을 돕는 서비스의 핵심 영역입니다.
        </p>
        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="rounded-lg border border-warmgray/40 bg-navy/60 p-6 transition-colors hover:border-warmgray/60"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-md bg-amber-accent/15 text-amber-accent">
                <Icon className="w-6 h-6" aria-hidden />
              </div>
              <h3 className="mt-4 text-lg font-medium text-white">{title}</h3>
              <p className="mt-2 text-sm text-warmgray-light leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
