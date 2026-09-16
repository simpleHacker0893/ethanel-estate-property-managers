import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Ethanel',
  description: 'Property management for Kenyan letting agencies.',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // `lang` becomes locale-driven when next-intl is wired in the marketing
  // track. English only at launch, Swahili in R1.1 (D-25).
  return (
    <html lang="en-KE">
      <body>{children}</body>
    </html>
  )
}
