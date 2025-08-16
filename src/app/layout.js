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
  title: "Portfolio",
  description: "Portfolio Dev",
  icons: { icon: "/favicon.png" },
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
