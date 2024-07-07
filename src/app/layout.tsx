"use client";

import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";

import { TRPCReactProvider } from "~/trpc/react";
import { RainbowProvider } from "./hooks/useRainbow";

import { Roboto_Mono } from "next/font/google";

const roboto = Roboto_Mono({
  weight: "400",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body className={roboto.className}>
        <RainbowProvider>
          <TRPCReactProvider>{children}</TRPCReactProvider>
        </RainbowProvider>
      </body>
    </html>
  );
}
