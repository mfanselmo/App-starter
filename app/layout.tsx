import { ClerkProvider, SignedIn, SignedOut } from "@clerk/nextjs";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { type Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Inter as FontSans } from "next/font/google";
import { extractRouterConfig } from "uploadthing/server";

import Provider from "@/app/_trpc/Provider";
import { ourFileRouter } from "@/app/api/uploadthing/core";

import { cn } from "@/lib/utils";

import Header from "@/components/header";
import Unauthenticated from "@/components/unauthenticated";

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
            <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
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
