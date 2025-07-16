"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Header from "./components/Header";
import { useState } from "react";
import StoreProvider from './StoreProvider'
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default  function RootLayout({ children }) {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState("Login");

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        
        <ThemeProvider attribute="data-theme" enableSystem>
          <StoreProvider>
          <Header
            open={open}
            setOpen={setOpen}
            activeItem={activeItem}
            setActiveItem={setActiveItem}
            route={route}
            setRoute={setRoute}
          />
          <>{children}</>

          </StoreProvider>
        </ThemeProvider>{" "}
      </body>
    </html>
  );
}
