"use client"
import { SessionProvider } from "next-auth/react";
import "./globals.css";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`
          font-sans antialiased
          bg-background text-foreground
          min-h-screen
        `}
      >
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}