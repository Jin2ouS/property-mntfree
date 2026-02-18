const steps = [
  {
    id: 'goal',
    title: 'Goal Definition',
    description: '목표와 제약을 명확히 정의합니다.',
  },
  {
    id: 'screening',
    title: 'Asset Screening',
    description: '구조적 기준에 맞는 자산을 선별합니다.',
  },
  {
    id: 'cashflow',
    title: 'Cash Flow Analysis',
    description: '현금 흐름을 수치로 분석합니다.',
  },
  {
    id: 'risk',
    title: 'Risk Rules',
    description: '리스크 한도와 규칙을 설정합니다.',
  },
  {
    id: 'monitoring',
    title: 'Monitoring',
    description: '계획 대비 추적과 조정을 수행합니다.',
  },
];

export function PortfolioFramework() {
  return (
    <section id="framework" className="py-20 sm:py-28 bg-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-semibold text-white text-center">
          Portfolio Framework
        </h2>
        <p className="mt-4 text-warmgray-light text-center max-w-2xl mx-auto">
          프로세스 기반의 자산 설계 흐름입니다.
        </p>

        {/* Desktop: horizontal flow with arrows */}
        <div className="mt-16 hidden lg:flex flex-wrap items-stretch justify-center gap-0">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-stretch">
              <div className="w-52 rounded-lg border border-warmgray/40 bg-navy-light/80 p-5 flex flex-col">
                <span className="text-xs font-medium text-amber-accent uppercase tracking-wider">
                  Step {index + 1}
                </span>
                <h3 className="mt-2 font-medium text-white">{step.title}</h3>
                <p className="mt-2 text-sm text-warmgray-light flex-1">
                  {step.description}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div className="flex items-center px-1">
                  <svg
                    className="w-5 h-5 text-warmgray/60 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile: vertical stack */}
        <div className="mt-16 lg:hidden space-y-4">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className="flex gap-4 rounded-lg border border-warmgray/40 bg-navy-light/80 p-5"
            >
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-accent/20 text-amber-accent flex items-center justify-center text-sm font-medium">
                {index + 1}
              </span>
              <div>
                <h3 className="font-medium text-white">{step.title}</h3>
                <p className="mt-1 text-sm text-warmgray-light">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
