import React from 'react';

import '../../globals.css';
import '@/global.scss';

import { ThemeProvider } from '@/components/theme-provider';
import { StoreProvider } from '@/hooks/use-store';
import { LocalStorageProvider } from '@/hooks/use-local-storage';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body>
                <LocalStorageProvider>
                    <StoreProvider>
                        <ThemeProvider
                            attribute="class"
                            defaultTheme="system"
                            enableSystem
                            disableTransitionOnChange>
                            <main className="max-w-[1200px] bg-background relative mx-auto grid place-items-center overflow-hidden">
                                {children}
                            </main>
                        </ThemeProvider>
                    </StoreProvider>
                </LocalStorageProvider>
            </body>
        </html>
    );
}
