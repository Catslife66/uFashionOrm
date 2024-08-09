import "../../globals.css";
import AdminPanelSidebar from "app/components/AdminPanelSidebar";

export const metadata = {
  title: "Product Manager",
};

export default function ProductManagerLayout({ children }) {
  return (
    <div>
      <AdminPanelSidebar />
      <main className="p-4 sm:ml-64">{children}</main>
    </div>
  );
}
