import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Routes, Route } from 'react-router'
import { MarketDetail } from './features/market/components/MarketDetail.tsx'
import { MarketList } from './features/market/components/MarketList.tsx'
import { mockMarkets } from './mock.ts'
import { Privacy } from './features/service-info/Privacy.tsx'
import { Terms } from './features/service-info/Terms.tsx'
import { About } from './features/service-info/About.tsx'
import { Auth } from './features/auth/components/Auth.tsx'
import { AccountSettings } from './features/user-profile/components/UserSettings.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='*' element={<App children={<MarketList markets={mockMarkets} />} />} />
        <Route path='/market/*' element={<App children={<MarketDetail />} />} />
        <Route path='/privacy' element={<App children={<Privacy />} />} />
        <Route path='/terms' element={<App children={<Terms />} />} />
        <Route path='/about' element={<App children={<About />} />} />
        <Route path='/auth' element={<Auth/>} />
        <Route path='/settings' element={<AccountSettings/>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
