import Header from "@/components/header";
import Unauthenticated from "@/components/unauthenticated";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/nextjs";
import { type Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Inter as FontSans } from "next/font/google";

import Provider from "@/app/_trpc/Provider";

import { cn } from "@/lib/utils";

import "./globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "App boilerplate",
  description: "App boilerplate",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <Provider>
        <html lang="en" suppressHydrationWarning>
          <body
            className={cn(
              "min-h-screen bg-background font-sans antialiased",
              fontSans.variable,
            )}
          >
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <Header />
              <main className="mx-auto container px-6 py-6">
                <SignedOut>
                  <Unauthenticated />
                </SignedOut>
                <SignedIn>{children}</SignedIn>
              </main>
            </ThemeProvider>
          </body>
        </html>
      </Provider>
    </ClerkProvider>
  );
}
