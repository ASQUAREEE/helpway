import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import './globals.css'
import StyledComponentsRegistry from '../lib/antd/AntdRegistry';
import LanguageProvider from "@/utils/language/LanguageProvider";

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: 'Help Way',
    description: 'develop version',
    robots: {
        index: false,
        follow: false,
        noimageindex: true
    }
}

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <LanguageProvider>
            <StyledComponentsRegistry>
                {children}
            </StyledComponentsRegistry>
        </LanguageProvider>
        </body>
        </html>
    )
}
