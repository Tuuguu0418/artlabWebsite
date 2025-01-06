import Navigationbar from "@/components/navbar/Navbar";
import SessionWrapper from "@/components/SessionWrapper";
import { LanguageProvider } from "@/context/LanguageContext";
import { PostProvider } from "@/context/PostContext";
import { GoogleAnalytics } from "@next/third-parties/google";
import { NextUIProvider } from "@nextui-org/react";
import { Montserrat } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import { Providers } from "./ThemeProviders";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "ArtLab",
  description: "Cloud ERP system",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth bg-black" suppressHydrationWarning>
      <body className={montserrat.className}>
        <SessionWrapper>
          <LanguageProvider>
            <PostProvider>
              <NextUIProvider>
                <Providers>
                  <Navigationbar />
                  <div className="overflow-hidden min-h-screen bg-black">
                    {children}
                    <ToastContainer />
                  </div>
                </Providers>
              </NextUIProvider>
            </PostProvider>
          </LanguageProvider>
        </SessionWrapper>
      </body>
      <GoogleAnalytics gaId="G-E4DSJ1DBPP" />
    </html>
  );
}
