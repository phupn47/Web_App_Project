"use client"

import { useEffect, useState } from "react"

export default function LogsPage() {
    const [logs, setLogs] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchLogs = async (pageNum) => {
        const config = JSON.parse(localStorage.getItem("droneConfig"));
        if (!config) return;

        const response = await fetch(`http://localhost:5000/logs/${config.drone_id}?page=${pageNum}&perPage=12`);
        const data = await response.json();

        setLogs(data.items || []);
        setTotalPages(data.totalPages || 1);
    }

    useEffect(() => {
        fetchLogs(page);
    }, [page]);

    return (
        <main className="p-8">
            <div className="mb-16">
                <h1 className="text-neutral-900 text-3xl font-bold mb-4 tracking-wide">Drone Logs</h1>
                <p className="text-neutral-900">Shows your drone temperature logs.</p>
            </div>
            <table className="w-full border-collapse border text-neutral-900">
                <thead className="bg-blue-200">
                    <tr className="text-neutral-900">
                        <th className="border p-2">Created</th>
                        <th className="border p-2">Country</th>
                        <th className="border p-2">Drone ID</th>
                        <th className="border p-2">Drone Name</th>
                        <th className="border p-2">Celsius</th>
                    </tr>
                </thead>
                <tbody className="bg-blue-50">
                    {logs.map((log, index) => (
                        <tr key={index} className="text-neutral-900">
                            <td className="border p-2">{new Date(log.created).toLocaleString()}</td>
                            <td className="border p-2">{log.country}</td>
                            <td className="border p-2">{log.drone_id}</td>
                            <td className="border p-2">{log.drone_name}</td>
                            <td className="border p-2">{log.celsius}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex justify-center mt-8 gap-4">
                <button
                    onClick={() => setPage(page - 1)}
                    disabled={page <= 1}
                    className="px-4 py-2 bg-neutral-200 rounded-lg border border-neutral-900 text-neutral-900 disabled:opacity-50 flex"
                >
                    ◀
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                    <button
                        key={num}
                        onClick={() => setPage(num)}
                        className={`px-3 py-1 rounded-lg border ${num === page
                            ? "bg-blue-500 text-neutral-50 border-neutral-900"
                            : "bg-neutral-50 hover:bg-neutral-200 border-neutral-900"
                            }`}
                    >
                        {num}
                    </button>
                ))}
                <button
                    onClick={() => setPage(page + 1)}
                    disabled={page >= totalPages}
                    className="px-4 py-2 bg-neutral-200 rounded-lg border border-neutral-900 text-neutral-900 disabled:opacity-50"
                >
                    ▶
                </button>
            </div>
        </main>
    );
}