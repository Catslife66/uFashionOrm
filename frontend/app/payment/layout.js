import "../globals.css";
import Header from "app/components/Header";
import Footer from "app/components/Footer";
import Breadcrumbs from "app/components/Breadcrumbs";

export const metadata = {
  title: "Checkout my bag",
  description: "payment",
};

export default function ProductLayout({ children }) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
