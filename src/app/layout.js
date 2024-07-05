import Navigationbar from "@/components/navbar/Navbar";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "Artlab Forms",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth bg-black">
      <body className={montserrat.className}>
        <Navigationbar />
        <div className="overflow-hidden min-h-screen bg-black">{children}</div>
      </body>
    </html>
  );
}