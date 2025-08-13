import Footer from "../../component/Footer";
import Navbar from "../../component/Navbar";
import "./globals.css";

export const metadata = {
  title: "Portfolio",
  description: "Portfolio Dev",
  icons: { icon: "/favicon.png" }, // <-- pas de ../public, jamais.
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
