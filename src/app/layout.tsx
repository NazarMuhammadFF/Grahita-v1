import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import SmoothScroller from "@/components/SmoothScroller";
import CustomCursor from "@/components/CustomCursor";
import BackgroundMusic from "@/components/BackgroundMusic";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Grahita: The Burden of Empathy",
  description:
    "A cozy, surreal storybook built from living geometric and organic shapes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="antialiased bg-[#FDFBF7] text-[#121820] font-sans selection:bg-[#84A59D] selection:text-[#FDFBF7] overflow-x-hidden">
        <SmoothScroller>
          <BackgroundMusic />
          <CustomCursor />
          {children}
        </SmoothScroller>
      </body>
    </html>
  );
}
