import { ThemeProvider } from "@/Components/ThemeProvider";
import WithAuth from "@/Components/WithAuth";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nest.JS Integrate To Next.JS",
  description: "Nest.JS Authentication Integrate To Next.JS"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <WithAuth>
            {children}
          </WithAuth>
        </ThemeProvider>
      </body>
    </html>
  );
};