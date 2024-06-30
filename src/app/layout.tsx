import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import './globals.css'
import StyledComponentsRegistry from '../lib/antd/AntdRegistry';
import LanguageProvider from "@/utils/language/LanguageProvider";
import Provider from '@/components/Provider';
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from '@/components/ui/toaster';

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
        
        <ClerkProvider>
        <html lang="en">
        <body className={inter.className}>
        <LanguageProvider>
            <StyledComponentsRegistry>   
                <Provider>
                    {children}
                    <Toaster />
                </Provider>
                </StyledComponentsRegistry>
            </LanguageProvider>
        </body>
        </html>
        </ClerkProvider>
    )
}
