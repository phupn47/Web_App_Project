import Link from "next/link";
import "./globals.css";

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
            <Link href="/">
                <h1 className="mb-6 font-bold text-center text-xl tracking-wide text-neutral-50 hover:text-blue-200 transition-colors">Drone Dashboard</h1>
            </Link>
            <nav className="flex flex-col gap-3 ">
              <Link
                href="/"
                className="px-4 py-2 rounded hover:bg-blue-500 transition-colors"
              >
                Home
              </Link>
              <Link
                href="/config"
                className="px-4 py-2 rounded-lg hover:bg-blue-500 transition-colors"
              >
                View Config
              </Link>
              <Link
                href="/form"
                className="px-4 py-2 rounded-lg hover:bg-blue-500 transition-colors"
              >
                Temperature Log
              </Link>
              <Link
                href="/logs"
                className="px-4 py-2 rounded-lg hover:bg-blue-500 transition-colors"
              >
                View Logs
              </Link>
            </nav>
          </div>

          <div className="p-4 text-center text-sm text-blue-200 border-t border-blue-200">
            Phawadon - 66010608
          </div>
        </aside>

        <main className="flex-1 bg-neutral-50 text-neutral-900 p-8">{children}</main>
      </body>
    </html>
  );
}
