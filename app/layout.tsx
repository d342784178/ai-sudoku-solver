import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import './globals.css'
import {AntdRegistry} from "@ant-design/nextjs-registry";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Solve Sudoku Puzzle By AI',
    description: 'Use AI technology to explain the solution ideas of Sudoku puzzles for you',
    keywords: ['Sudoku Solution Strategies', 'AI Sudoku Explanation']
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
