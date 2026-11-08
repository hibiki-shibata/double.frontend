import { Outlet } from 'react-router'
import { QueryClientProvider } from '@tanstack/react-query'
import { Header } from './common/components/Header'
import { Footer } from './common/components/Footer'
import { AuthProvider } from './common/lib/auth/context/AuthContext'
import { queryClient } from './common/lib/queryClient'

// Giving Providers
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <div className='min-h-screen bg-slate-950 text-white'>
          <Header />
          <Outlet />
          <Footer />
        </div>
      </AuthProvider>
    </QueryClientProvider>
  )
}