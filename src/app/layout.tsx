import type { Metadata } from 'next'
import localFont from 'next/font/local'
import '@/styles/globals.css'
import { Toaster } from 'sonner'
import { ThemeProvider } from '@/providers/theme-provider'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export const metadata: Metadata = {
  title: 'codewithcengdong shop admin',
  description: 'React Native Shop Admin',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute={'class'}
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main>{children}</main>
          <Toaster richColors />
        </ThemeProvider>
      </body>
    </html>
  )
}
