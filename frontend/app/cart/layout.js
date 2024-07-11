import "../globals.css";
import Header from "app/components/Header";
import Footer from "app/components/Footer";

export const metadata = {
  title: "UFashion",
  description: "E-commerce site for women fashion",
};

export default function HomePageLayout({ children }) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
