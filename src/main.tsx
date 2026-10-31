import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import App from './App.tsx'
import './index.css'
import { MarketDetail } from './features/market/components/marketDetail/MarketDetail.tsx'
import { MarketList } from './features/market/components/marketList/MarketList.tsx'
import { Privacy } from './features/service-info/Privacy'
import { Terms } from './features/service-info/Terms'
import { About } from './features/service-info/About'
import { Auth } from './features/auth/components/Auth'
import { AccountSettings } from './features/user-profile/components/UserSettings'
import { ProtectedRoute } from './components/Protected'
import { worker } from './mock/browser.ts'
import { coreConfig } from './config/coreConfig.ts'

async function executeBeforeServerStarts() {
  if (coreConfig.RUNTIME_ENV !== 'prod') {
    await worker.start()
  }
}

executeBeforeServerStarts().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <BrowserRouter>
        <Routes>
          {/* App acts as a layout with shared components (Header, Footer) */}
          <Route element={<App />}>
            {/* Index route for the main page */}
            <Route index element={<MarketList />} />

            {/* Nested routes */}
            <Route path="market/:marketId" element={<MarketDetail />} />
            <Route path="privacy" element={<Privacy />} />
            <Route path="terms" element={<Terms />} />
            <Route path="about" element={<About />} />

            {/* Protected route */}
            <Route element={<ProtectedRoute />} >
              <Route path="settings" element={<AccountSettings />} />
            </Route>
          </Route>

          <Route path="auth" element={<Auth />} />
        </Routes>
      </BrowserRouter>
    </StrictMode>
  )
}
)

