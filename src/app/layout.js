import Footer from "../../component/Footer";
import Navbar from "../../component/Navbar";
import "./globals.css";

import { Instrument_Sans } from "next/font/google";

const instrument = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});
const instrumentDisplay = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata = {
  title: "Portfolio - Matteo Padalino",
  description:
    "Portfolio de Matteo Padalino, développeur fullstack et intégrateur.",
  keywords: [
    "Portfolio",
    "Développeur",
    "Fullstack",
    "React",
    "Next.js",
    "Matteo Padalino",
  ],
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Portfolio - Matteo Padalino",
    description:
      "Découvrez mes projets, compétences et parcours en développement web fullstack.",
    url: "https://matteopadalino.dev", // remplace par ton domaine
    siteName: "Portfolio Matteo Padalino",
    images: [
      {
        url: "/seo_img.png", // place ton image SEO dans /public
        width: 1200,
        height: 630,
        alt: "Logo et identité visuelle de Matteo Padalino",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio - Matteo Padalino",
    description:
      "Découvrez mes projets, compétences et parcours en développement web fullstack.",
    images: ["/seo_img.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="fr"
      className={`${instrument.variable} ${instrumentDisplay.variable}`}
    >
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
