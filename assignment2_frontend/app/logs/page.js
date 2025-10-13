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
            <h1 className="text-2xl font-bold mb-4">Drone Logs</h1>
            <table className="min-w-full border-collapse border border-gray-300">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border p-2">Created</th>
                        <th className="border p-2">Country</th>
                        <th className="border p-2">Drone ID</th>
                        <th className="border p-2">Drone Name</th>
                        <th className="border p-2">Celsius</th>
                    </tr>
                </thead>
                <tbody>
                    {logs.map((log, index) => (
                        <tr key={index}>
                            <td className="border p-2">{new Date(log.created).toLocaleString()}</td>
                            <td className="border p-2">{log.country}</td>
                            <td className="border p-2">{log.drone_id}</td>
                            <td className="border p-2">{log.drone_name}</td>
                            <td className="border p-2">{log.celsius}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex justify-center mt-6 gap-4">
                <button
                    onClick={() => setPage(page - 1)}
                    disabled={page <= 1}
                    className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                >
                    ◀ Prev
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                    <button
                        key={num}
                        onClick={() => setPage(num)}
                        className={`px-3 py-1 rounded-md border ${num === page
                                ? "bg-blue-500 text-white border-blue-500"
                                : "bg-white hover:bg-gray-100 border-gray-300"
                            }`}
                    >
                        {num}
                    </button>
                ))}
                <button
                    onClick={() => setPage(page + 1)}
                    disabled={page >= totalPages}
                    className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                >
                    Next ▶
                </button>
            </div>
        </main>
    );
}