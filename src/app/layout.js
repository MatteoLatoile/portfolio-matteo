import Navbar from "../../component/Navbar";
import "./globals.css";

export const metadata = {
  title: "Portfolio",
  description: "Portfolio Dev",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <Navbar />
      <body>{children}</body>
    </html>
  );
}
