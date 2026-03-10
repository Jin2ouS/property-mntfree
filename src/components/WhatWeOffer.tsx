import { Gavel, Building2, Tag, Calculator } from 'lucide-react';

const items = [
  {
    icon: Gavel,
    title: '경매',
    description: '법원 경매 물건 탐색, 입찰 전략, 수익 구조 검토.',
  },
  {
    icon: Building2,
    title: '재개발·재건축',
    description: '추정 배정·수익 구조 등 관련 검토 흐름 지원.',
  },
  {
    icon: Tag,
    title: '저가 매입',
    description: '급매·할인 매물 발굴과 수익성 검토.',
  },
  {
    icon: Calculator,
    title: '수익성 검토',
    description: '매입·보수·매도 단계별 수익 시뮬레이션.',
  },
];

export function WhatWeOffer() {
  return (
    <section className="py-20 sm:py-28 bg-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-semibold text-white text-center">
          Service Scope
        </h2>
        <p className="mt-4 text-warmgray-light text-center max-w-2xl mx-auto">
          현재 다루는 영역입니다. 구현 범위에 따라 확장됩니다.
        </p>
        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="rounded-lg border border-warmgray/40 bg-navy-light/60 p-6 transition-colors hover:border-warmgray/60"
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
