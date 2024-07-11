import { ThemeProvider } from "@/Components/ThemeProvider";
import Session from "@/Components/Session";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import { ReactNode } from "react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next Auth.JS!",
  description: "Next Auth.JS Version 5!"
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {

  const session = await auth();

  return (
    <Session session={session}>
      <html lang="en">
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </Session>
  )
};