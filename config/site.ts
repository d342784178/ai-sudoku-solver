const baseSiteConfig = {
    name: 'Solve Sudoku Puzzle By AI',
    description: 'Use AI technology to explain the solution ideas of Sudoku puzzles for you',
    keywords: ['Sudoku', 'Sudoku Solver', 'Sudoku Explanation', 'Sudoku Solver Step By Step'],
    url: "https://ai-sudoku.top",
    // authors: [
    //     {
    //         name: "weijunext",
    //         url: "https://weijunext.com",
    //     }
    // ],
    creator: '@hahaee',
    // themeColor: '#fff',
    // 可以在这个网站生成所有平台的ico：https://realfavicongenerator.net/
    // icons: {
    //     icon: "/favicon.ico",
    //     shortcut: "/favicon-16x16.png",
    //     apple: "/apple-touch-icon.png",
    // },
    // ogImage: "https://nextjs.weijunext.com/og.jpg",
    // links: {
    //     twitter: "https://twitter.com/weijunext",
    //     github: "https://github.com/weijunext/nextjs-learn-demos",
    // },
}

export const siteConfig = {
    ...baseSiteConfig,
    openGraph: {
        type: "website",
        locale: "en_US",
        url: baseSiteConfig.url,
        title: baseSiteConfig.name,
        description: baseSiteConfig.description,
        siteName: baseSiteConfig.name,
    },
    twitter: {
        card: "summary_large_image",
        title: baseSiteConfig.name,
        description: baseSiteConfig.description,
        images: [`${baseSiteConfig.url}/og.png`],
        creator: baseSiteConfig.creator,
    },
}