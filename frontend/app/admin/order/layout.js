import "../../globals.css";
import AdminPanelSidebar from "app/components/AdminPanelSidebar";

export const metadata = {
  title: "Order Manager",
};

export default function OrderLayout({ children }) {
  return (
    <div>
      <AdminPanelSidebar />
      <main className="p-4 sm:ml-64">{children}</main>
    </div>
  );
}
