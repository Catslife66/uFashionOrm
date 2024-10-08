import "../globals.css";
import Header from "app/components/Header";
import Footer from "app/components/Footer";

export const metadata = {
  title: "Product reviews",
  description: "Generated by create next app",
};

export default function ReviewLayout({ children }) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
