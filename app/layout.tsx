import {Inter} from 'next/font/google'
import './globals.css'
import {AntdRegistry} from "@ant-design/nextjs-registry";
import GoogleAnalytics from "@/app/ui/Google";
import {siteConfig} from "@/config/site";

const inter = Inter({subsets: ['latin']})

export const metadata = {
    title: siteConfig.name,
    description: siteConfig.description,
    keywords: siteConfig.keywords,
    authors: siteConfig.authors,
    creator: siteConfig.creator,
    themeColor: siteConfig.themeColor,
    icons: siteConfig.icons,
    // metadataBase: siteConfig.metadataBase,
    openGraph: siteConfig.openGraph,
    twitter: siteConfig.twitter,
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <GoogleAnalytics/>
        <AntdRegistry>{children}</AntdRegistry>
        </body>
        </html>
    )
}
