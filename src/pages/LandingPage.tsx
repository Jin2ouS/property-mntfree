import { Hero } from '../components/Hero'
import { WhatWeDo } from '../components/WhatWeDo'
import { Workflow } from '../components/Workflow'
import { WhyThisService } from '../components/WhyThisService'
import { WhatWeOffer } from '../components/WhatWeOffer'
import { Closing } from '../components/Closing'

export function LandingPage() {
  return (
    <>
      <Hero />
      <main>
        <WhatWeDo />
        <Workflow />
        <WhyThisService />
        <WhatWeOffer />
        <Closing />
      </main>
    </>
  )
}
