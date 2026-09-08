import { Outlet } from 'react-router'
import { Header } from './components/Header'
import { Footer } from './components/Footer'

export default function App() {
  return (
    <div className='min-h-screen bg-slate-950 text-white'>
      <Header />
      <main className='px-4 sm:px-6 lg:px-8 py-10 '>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}