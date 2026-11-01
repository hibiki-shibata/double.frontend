import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router'
import App from './App.tsx'
import './index.css'
import { MarketList } from './pages/marketList/page.tsx'
import { MarketDetail } from './pages/market/[id]/page.tsx'
import { Privacy } from './pages/privacy/page.tsx'
import { Terms } from './pages/terms/page.tsx'
import { About } from './pages/about/page.tsx'
import { Auth } from './pages/auth/page.tsx'
import { AccountSettings } from './features/user-profile/components/UserSettings'
import { ProtectedRoute } from './common/components/Protected.tsx'
import { worker } from './mock/browser.ts'
import { coreConfig } from './common/config/coreConfig.ts'

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
          {/* Injecting Provider */}
          <Route element={<App />}>

            {/* Public routes */}
            <Route index element={<Navigate to="/marketList" replace />} />
            <Route path="marketList" element={<MarketList />} />
            <Route path="market/:marketId" element={<MarketDetail />} />
            <Route path="privacy" element={<Privacy />} />
            <Route path="terms" element={<Terms />} />
            <Route path="about" element={<About />} />
            <Route path='*' element={<Navigate to="/marketList" replace />} />

            {/* Protected routes */}
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

