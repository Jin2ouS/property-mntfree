import { Routes, Route } from 'react-router-dom'
import { LandingPage } from './pages/LandingPage'
import { ManagePage } from './pages/ManagePage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/manage" element={<ManagePage />} />
    </Routes>
  )
}

export default App
