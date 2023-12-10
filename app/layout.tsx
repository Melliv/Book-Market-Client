import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import bg from '../assets/images/bg4.jpg'
import TopNavBar from './components/common/TopNavBar'
import { Providers } from './store/providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Books Marketplace',
  description: 'Sell and buy books',
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">

      <body
        style={{
          backgroundImage: `url(${bg.src})`,
          width: '100%',
          height: '100%',
        }}
        className={inter.className}
      ><Providers>
          <TopNavBar />
          <div>
            {children}
          </div>
        </Providers>
      </body>
    </html>
  )
}
