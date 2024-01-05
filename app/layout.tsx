import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import './globals.css'
import {AntdRegistry} from "@ant-design/nextjs-registry";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'AI Sudoku Game Solution Strategies and Explanation',
    description: 'Get an in-depth understanding of how AI solves Sudoku puzzles. Learn the working principles of AI and how they are applied to Sudoku games.',
    keywords: ['AI Sudoku', 'Sudoku Solution Strategies', 'AI Sudoku Explanation', 'Game Strategies', 'Artificial Intelligence Games']
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
    <body className={inter.className}>
    <AntdRegistry>{children}</AntdRegistry>
    </body>
    </html>
  )
}
