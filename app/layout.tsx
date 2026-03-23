import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Image Background Remover',
  description: '快速去除图片背景',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh">
      <body>{children}</body>
    </html>
  )
}
