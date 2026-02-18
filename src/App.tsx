import { Hero } from './components/Hero'
import { AssetsWithIntention } from './components/AssetsWithIntention'
import { PortfolioFramework } from './components/PortfolioFramework'
import { CorePrinciples } from './components/CorePrinciples'
import { Closing } from './components/Closing'

function App() {
  return (
    <>
      <Hero />
      <main>
        <AssetsWithIntention />
        <PortfolioFramework />
        <CorePrinciples />
        <Closing />
      </main>
    </>
  )
}

export default App
