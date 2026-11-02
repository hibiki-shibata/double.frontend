import { Outlet } from 'react-router'
import { Header } from './common/components/Header'
import { Footer } from './common/components/Footer'
import { QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from './features/auth/contexts/AuthContext'
import { queryClient } from './common/lib/queryClient'

// Giving Providers
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <div className='min-h-screen bg-slate-950 text-white'>
          <Header />
          {/* <main className='px-4 sm:px-6 lg:px-8 py-10'> */}
          <Outlet />
          {/* </main> */}
          <Footer />
        </div>
      </AuthProvider>
    </QueryClientProvider>
  )
}