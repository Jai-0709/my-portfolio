import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Jaisurya - Full Stack Developer",
  description:
    "Building scalable and performant web applications with modern technologies.",
  keywords: [
    "Jaisurya",
    "Full Stack Developer",
    "React",
    "Next.js",
    "Portfolio",
    "Web Developer",
  ],
  openGraph: {
    title: "Jaisurya - Portfolio",
    description:
      "Building scalable and performant web applications with modern technologies.",
    url: "https://my-portfolio-o3gb.vercel.app/",
    siteName: "Jaisurya",
    images: [
      {
        url: "/img/preview.png",
        width: 1200,
        height: 630,
        alt: "Jaisurya - Portfolio",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jaisurya - Portfolio",
    description:
      "Building scalable and performant web applications with modern technologies.",
    images: ["/img/preview.png"],
  },
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
