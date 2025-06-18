import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AirStudio Admin',
  description: 'Content management for AirStudio Portfolio',
  robots: {
    index: false,
    follow: false,
  },
}

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 