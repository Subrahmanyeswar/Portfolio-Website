import type { Metadata } from "next";
import { Syne, JetBrains_Mono } from "next/font/google";
import dynamic from "next/dynamic";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-heading",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Subrahmanyeswar Kolluru — AI Engineer | ML Systems | Computer Vision",
  description:
    "AI Engineer specializing in Computer Vision, LLM Systems, and Edge AI. Published researcher at ICCCNT 2025 IIT Indore. Open to AI/ML Engineer roles 2026-2027.",
  keywords: [
    "AI Engineer",
    "Machine Learning",
    "Computer Vision",
    "LLM Systems",
    "Edge AI",
    "Deep Learning",
    "YOLOv8",
    "TensorRT",
    "LangChain",
    "RAG",
    "AI Agents",
    "Subrahmanyeswar Kolluru",
    "IIT Indore Research",
  ],
  authors: [{ name: "Subrahmanyeswar Kolluru" }],
  metadataBase: new URL("https://subrahmanyeswarkolluru.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Subrahmanyeswar Kolluru — AI Engineer | ML Systems | Computer Vision",
    description:
      "Building intelligent systems at the intersection of deep learning, edge AI, and large language models.",
    url: "https://subrahmanyeswarkolluru.vercel.app",
    siteName: "Subrahmanyeswar Kolluru Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Subrahmanyeswar Kolluru — AI Engineer",
    description: "Specializing in Computer Vision, LLM Systems, and Edge AI.",
  },
};

const Navbar = dynamic(() => import("@/components/Navbar/Navbar"), { ssr: false });
const ScrollToTop = dynamic(() => import("@/components/ScrollToTop/ScrollToTop"), { ssr: false });
const ChatWidget = dynamic(() => import("@/components/Chat/ChatWidget"), { ssr: false });
const Footer = dynamic(() => import("@/components/Footer/Footer"));

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${syne.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <Navbar />
        {children}
        <ScrollToTop />
        <ChatWidget />
        <Footer />
      </body>
    </html>
  );
}
