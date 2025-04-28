import React from 'react';

import '@/global.css';
import '@/global.scss';

import { ThemeProvider } from '@/components/theme-provider';
import { StoreProvider } from '@/hooks/use-store';
import { LocalStorageProvider } from '@/hooks/use-local-storage';
import { CookiesProvider } from 'next-client-cookies/server';

import { ViewTransitions } from 'next-view-transitions';

export const metadata = {
    title: 'create-l3-app',
    description: 'Simple Next.js Scaffold',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body>
                <CookiesProvider>
                    <LocalStorageProvider>
                        <StoreProvider>
                            <ThemeProvider
                                attribute="class"
                                defaultTheme="system"
                                enableSystem
                                disableTransitionOnChange
                            >
                                <main className="max-w-[1200px] bg-background relative mx-auto h-[100dvh]">
                                    <ViewTransitions>{children}</ViewTransitions>
                                </main>
                            </ThemeProvider>
                        </StoreProvider>
                    </LocalStorageProvider>
                </CookiesProvider>
            </body>
        </html>
    );
}
