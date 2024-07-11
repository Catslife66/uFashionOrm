import { Inter } from "next/font/google";
import "../../globals.css";
import AdminPanel from "app/components/AdminPanel";

const inter = Inter({ subsets: ["latin"] });

export default function ProductManagerLayout({ children }) {
  return (
    <div className="antialiased bg-gray-50 dark:bg-gray-900">
      <AdminPanel />
      <main className="bg-white p-4 md:ml-64 h-auto pt-20">{children}</main>
    </div>
  );
}
