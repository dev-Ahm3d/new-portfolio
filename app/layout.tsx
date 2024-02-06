import Sidenav from '@/components/sidenav/Sidenav'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import AuthProvider from '@/components/AuthProvider'


const font = Inter({ 
    subsets: ['latin'] ,
    preload : true   // solve preload css warning
})

export const metadata: Metadata = {
  title: 'Ahmed Ehab Mannaa',
  description: 'Ahmed Ehab Mannaa',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className} suppressHydrationWarning={true}>
          <AuthProvider>
            <Sidenav/>
          </AuthProvider>
          {children}
      </body>
    </html>
  )
}
