import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import React, {Suspense} from "react";

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: 'Define Your Sudoku Puzzle',
    description: 'You Can Define A Sudoku Puzzle By Yourself ',
}

export default function RootLayout({children}: {
    children: React.ReactNode
}) {
    return (
        <body className={inter.className}>
        <Suspense fallback={<div
            className="max-w-full h-full p-4 md:p-0 content-center justify-center items-center max-h-4">Loading
            Game...</div>}>
            {children}
        </Suspense>
        </body>
    )
}
