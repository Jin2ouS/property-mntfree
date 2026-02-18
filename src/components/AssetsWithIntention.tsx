import { LayoutGrid, Wallet, Shield, Calendar } from 'lucide-react';

const items = [
  {
    icon: LayoutGrid,
    title: 'Structure',
    description: '시장 소음 제거. 구조적 설계 중심의 자산 구성을 지향합니다.',
  },
  {
    icon: Wallet,
    title: 'Cash Flow',
    description: '리스크 분산과 현금 흐름을 핵심 지표로 설계합니다.',
  },
  {
    icon: Shield,
    title: 'Risk Management',
    description: '한도 설정과 분산으로 리스크를 체계적으로 관리합니다.',
  },
  {
    icon: Calendar,
    title: 'Longevity',
    description: '수치 기반 계획과 장기 관점으로 자산을 설계합니다.',
  },
];

export function AssetsWithIntention() {
  return (
    <section id="how-it-works" className="py-20 sm:py-28 bg-navy-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-semibold text-white text-center">
          Assets with Intention
        </h2>
        <p className="mt-4 text-warmgray-light text-center max-w-2xl mx-auto">
          포트폴리오 구조 기반 부동산 자산 설계의 핵심 방향입니다.
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
