import "../../globals.css";
import AdminPanelSidebar from "app/components/AdminPanelSidebar";

export const metadata = {
  title: "Category Manager",
};

export default function AdminLayout({ children }) {
  return (
    <div>
      <AdminPanelSidebar />
      <main className="p-4 sm:ml-64">{children}</main>
    </div>
  );
}
