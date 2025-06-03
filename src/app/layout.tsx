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
  title: "Jaisurya - Full Stack Developer", // Replace "Your Name" with your actual name
  description:
    "Building scalable and performant web applications with modern technologies.",
  keywords: [
    "Jaisurya", // Replace "Your Name" with your actual name
    "Full Stack Developer",
    "React",
    "Next.js",
    "Portfolio",
    "Web Developer",
  ],
  openGraph: {
    title: "Jaisurya - Portfolio", // Replace "Your Name" with your actual name
    description:
      "Building scalable and performant web applications with modern technologies.",
    url: "https://my-portfolio-cm5n.vercel.app/", // Replace "#" with your deployed website URL
    siteName: "Jaisurya", // Replace "Your Name" with your actual name
    images: [
      {
        url: "/img/preview.png", // Take a screenshot of your homepage and save it as "preview.png" in the "public/img" folder.
        width: 1200,
        height: 630,
        alt: "Jaisurya - Portfolio", // Replace "Your Name" with your actual name
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jaisurya - Portfolio", // Replace "Your Name" with your actual name
    description:
      "Building scalable and performant web applications with modern technologies.",
    images: ["/img/preview.png"], // Take a screenshot of your homepage and save it as "preview.png" in the "public/img" folder.
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
