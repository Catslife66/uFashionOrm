import { Inter } from "next/font/google";
import "../../globals.css";
import AdminPanel from "app/components/AdminPanel";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="antialiased bg-gray-50 dark:bg-gray-900">
          <AdminPanel />
          <main className="bg-white p-4 md:ml-64 h-auto pt-20">{children}</main>
        </div>
      </body>
    </html>
  );
}
