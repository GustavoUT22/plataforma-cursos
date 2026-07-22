import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "EduTech Academy | Plataforma de Cursos e Inscripciones",
  description:
    "Plataforma académica certificada. Aprende programación, desarrollo web y más.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
