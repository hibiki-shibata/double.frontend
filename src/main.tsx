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
import { AccountSettings } from './pages/settings/page.tsx'
import { ProtectedRoute } from './features/auth/wrapper/ProtectedRoute.tsx'
import { coreConfig } from './common/config/coreConfig.ts'
import { worker } from './mock/browser.ts'
import { ROUTES } from './common/config/routes.ts'

async function executeBeforeServerStarts() {
  if (coreConfig.RUNTIME_ENV.toUpperCase() !== 'PROD') {
    await worker.start()
  }
}

executeBeforeServerStarts().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <BrowserRouter>
        <Routes>
          {/* Provider wrapper */}
          <Route element={<App />}>

            {/* Public routes */}
            <Route index element={<Navigate to={ROUTES.MARKET_LIST} replace />} />
            <Route path={ROUTES.MARKET_LIST} element={<MarketList />} />
            <Route path={ROUTES.MARKET_DETAILS({})} element={<MarketDetail />} />
            <Route path={ROUTES.PRIVACY} element={<Privacy />} />
            <Route path={ROUTES.TERMS} element={<Terms />} />
            <Route path={ROUTES.ABOUT} element={<About />} />
            <Route path={ROUTES.AUTH({})} element={<Auth />} />
            <Route path='*' element={<Navigate to={ROUTES.MARKET_LIST} replace />} />

            {/* Protected routes - Auth required */}
            <Route element={<ProtectedRoute />} >
              <Route path={ROUTES.SETTINGS} element={<AccountSettings />} />
            </Route>

          </Route>
        </Routes>
      </BrowserRouter>
    </StrictMode>
  )
}
)

