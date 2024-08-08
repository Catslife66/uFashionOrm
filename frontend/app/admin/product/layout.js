import "../../globals.css";
import AdminPanelSidebar from "app/components/AdminPanelSidebar";

export const metadata = {
  title: "Product Manager",
};

export default function ProductManagerLayout({ children }) {
  return (
    <div className="antialiased bg-gray-50 dark:bg-gray-900">
      <AdminPanelHeader />
      <div className="bg-white">
        <AdminPanelSidebar />
        <main className="p-4 md:ml-64 h-auto pt-20">{children}</main>
      </div>
    </div>
  );
}
