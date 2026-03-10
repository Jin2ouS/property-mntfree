export function Closing() {
  return (
    <>
      <section className="py-20 sm:py-28 bg-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-semibold text-white">
            Structure Trumps Speculation
          </h2>
          <p className="mt-6 text-lg sm:text-xl text-warmgray-light max-w-2xl mx-auto">
            Systems empower decisions.
            <br />
            We design systems, not predictions.
          </p>
          <p className="mt-8 text-sm text-warmgray">
            Built by MnTfree · Structured with the mindset of Everprin
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
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
              도구 살펴보기
            </a>
          </div>
        </div>
      </section>
      <footer className="py-8 border-t border-warmgray/30 bg-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-warmgray">
            property.mntfree.com · MnTfree · Everprin
          </p>
        </div>
      </footer>
    </>
  );
}
