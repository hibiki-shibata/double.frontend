// import { Footer } from './components/Footer'
// import { Header } from './components/Header'
// import type { ReactNode } from 'react'


// // App.tsx
// function App({ children }: { children: ReactNode }) {
//   return (
//     <div className='min-h-screen bg-slate-900 text-white'>
//       <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 -z-10" />
//       <Header />
//       <main className='px-4 sm:px-6 lg:px-8 py-10 '>
//         {/* pt-20 accounts for header height (16 = 4rem) */}
//         {children}
//       </main>
//       <Footer />
//     </div>
//   )
// }

// export default App

import { Outlet } from 'react-router'
import { Header } from './components/Header'
import { Footer } from './components/Footer'

export default function App() {
  return (
    <div className='min-h-screen bg-slate-900 text-white'>
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 -z-10" />
      <Header />
      <main className='px-4 sm:px-6 lg:px-8 py-10 '>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}