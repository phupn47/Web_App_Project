import Link from "next/link";
import "./globals.css"; // ถ้ามี global styles

export const metadata = {
  title: "Drone Monitoring Dashboard",
  description: "Web App Project for Drone Config & Log Management",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen">
        <aside className="w-60 bg-blue-900 text-neutral-50 flex flex-col justify-between">
          <div className="p-6">
            <h1 className="text-xl font-bold mb-6 text-center tracking-wide">Drone Dashboard</h1>
            <nav className="flex flex-col gap-3 ">
              <Link
                href="/"
                className="px-4 py-2 rounded hover:bg-blue-800 transition-colors"
              >
                Home
              </Link>
              <Link
                href="/config"
                className="px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors"
              >
                View Config
              </Link>
              <Link
                href="/form"
                className="px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors"
              >
                Temperature Log
              </Link>
              <Link
                href="/logs"
                className="px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors"
              >
                View Logs
              </Link>
            </nav>
          </div>

          {/* footer */}
          <div className="p-4 text-center text-sm text-blue-200 border-t border-blue-200">
            Web App Project
          </div>
        </aside>

        {/* ✅ Main content (แต่ละหน้า) */}
        <main className="flex-1 bg-gray-50 text-gray-800 p-8">{children}</main>
      </body>
    </html>
  );
}
