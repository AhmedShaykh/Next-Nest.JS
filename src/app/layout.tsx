import { ReactNode } from "react";
import Providers from "@/Components/Providers";
import Navbar from "@/Components/Navbar";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Full Stack Authentication Next Nest.JS!",
  description: "# Full Stack Authentication Next Nest.JS!",
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <Providers>
      <html lang="en">
        <body className={inter.className}>
          <Navbar />
          {children}
        </body>
      </html>
    </Providers>
  )
};