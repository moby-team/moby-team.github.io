import { Inter } from 'next/font/google';
import React from "react";
import { ThemeProvider } from "./theme-provider";
import { ThemeSwitcher } from "./components/ThemeSwitcher";
// import { switchThemeDuration } from "./constants";
import './globals.css';

const inter = Inter({ subsets: ['latin']})

export default function RootLayout ({
    children, 
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
            {/* <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                <ThemeSwitcher /> */}
                <main>{children}</main>
            {/* </ThemeProvider> */}
            </body>
        </html>
    )
}