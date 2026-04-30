import React from 'react';

import '@/global.css';
import '@/global.scss';

import { ThemeProvider } from '@/components/theme-provider';
import { StoreProvider } from '@/hooks/use-store';
import { CookiesProvider } from 'next-client-cookies/server';

import { ViewTransitions } from 'next-view-transitions';

import { TITLE, DESC } from '@/data/static';
import InstallPrompt from '@/components/install-prompt';

export const metadata = {
    title: TITLE,
    description: DESC,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className="grid h-[100dvh] overflow-hidden">
                <CookiesProvider>
                    <StoreProvider>
                        <ThemeProvider
                            attribute="class"
                            defaultTheme="system"
                            enableSystem
                            disableTransitionOnChange
                        >
                            <main className="bg-background relative h-[100dvh] w-full">
                                <ViewTransitions>{children}</ViewTransitions>
                                <InstallPrompt />
                            </main>
                        </ThemeProvider>
                    </StoreProvider>
                </CookiesProvider>
            </body>
        </html>
    );
}
