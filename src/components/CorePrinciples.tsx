const principles = [
  '장기 현금 흐름 위주 설계',
  '리스크 한도 설정',
  '구조적 분산',
  '계획 대비 추적',
];

export function CorePrinciples() {
  return (
    <section className="py-20 sm:py-28 bg-navy-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-semibold text-white text-center">
          Core Principles
        </h2>
        <p className="mt-4 text-warmgray-light text-center max-w-2xl mx-auto">
          시스템이 지향하는 핵심 원칙입니다.
        </p>
        <ul className="mt-16 max-w-2xl mx-auto space-y-5">
          {principles.map((text, index) => (
            <li
              key={index}
              className="flex items-start gap-4 rounded-lg border border-warmgray/30 bg-navy/40 px-6 py-4"
            >
              <span className="flex-shrink-0 w-8 h-8 rounded-full border border-amber-accent/50 text-amber-accent flex items-center justify-center text-sm font-medium">
                {index + 1}
              </span>
              <span className="text-warmgray-light pt-0.5">{text}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
