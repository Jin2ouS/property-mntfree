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
          Design Your Assets with Structure.
          <br />
          <span className="text-warmgray-light font-medium">Not Speculation.</span>
        </h1>
        <p className="mt-6 text-lg sm:text-xl text-warmgray-light max-w-2xl mx-auto">
          A systemized approach to property portfolio, built for long-term resilience.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#framework"
            className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-amber-accent text-white font-medium hover:bg-amber-hover transition-colors"
          >
            Explore Framework
          </a>
          <a
            href="#how-it-works"
            className="inline-flex items-center justify-center px-6 py-3 rounded-md border border-warmgray text-warmgray-light font-medium hover:border-warmgray-light hover:text-white transition-colors"
          >
            How It Works
          </a>
        </div>
      </div>
    </header>
  );
}
