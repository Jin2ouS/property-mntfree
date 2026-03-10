const principles = [
  '감이 아니라 구조로 판단합니다. 수치와 체크리스트 기반의 투자 검토.',
  '반복 가능한 투자 프로세스를 설계합니다. 한 번 쓴 흐름은 계속 활용합니다.',
  '실무형 체크리스트와 분석 도구로 누락 없이 점검합니다.',
  '시간을 아끼는 리서치 흐름을 제공합니다. 불필요한 반복 작업을 줄입니다.',
];

export function WhyThisService() {
  return (
    <section className="py-20 sm:py-28 bg-navy-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-semibold text-white text-center">
          Why This Service
        </h2>
        <p className="mt-4 text-warmgray-light text-center max-w-2xl mx-auto">
          이 서비스를 선택해야 하는 이유입니다.
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
