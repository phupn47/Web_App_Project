"use client"

import { useState } from "react"

export default function LogFormPage() {
    const [celsius, setCelsius] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const config = JSON.parse(localStorage.getItem("droneConfig"));
        if (!config) return setMessage("Config not found");

        const body = {
            drone_id: config.drone_id,
            drone_name: config.drone_name,
            country: config.country,
            celsius: Number(celsius),
        };

        const response = await fetch("http://localhost:5000/logs", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });

        if (response.ok) {
            setMessage("Log submitted successfully!");
            setCelsius("");
        } else {
            setMessage("Failed to submit log");
        }
    };

    return (
        <main className="p-8">
            <h1 className="text-2xl font-bold mb-4">Temperature Log Form</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="number"
                    placeholder="Enter temperature in Celsius"
                    value={celsius}
                    onChange={(e) => setCelsius(e.target.value)}
                    className="border p-2 rounded-md w-60"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                    Submit data
                </button>
            </form>
            {message && <p className="mt-4 text-gray-700">{message}</p>}
        </main>
    );
}