"use client"

import { useEffect, useState } from "react"

export default function ConfigPage() {
    const [config, setConfig] = useState(null);

    useEffect(() => {
        fetch("http://localhost:5000/configs/66010608")
            .then((res) => res.json())
            .then((data) => {
                setConfig(data);
                localStorage.setItem("droneConfig", JSON.stringify(data)); // collect data for use next page
            });
    }, []);

    if (!config) return <p>Loading...</p>;

    return (
        <main className="p-8">
            <h1 className="text-2xl font-bold mb-4">Drone Configuration</h1>
            <div className="space-y-2 bg-gray-50 p-4 rounded-md shadow">
                <p>Drone ID: {config.drone_id}</p>
                <p>Drone Name: {config.drone_name}</p>
                <p>Light: {config.light}</p>
                <p>Country: {config.country}</p>
            </div>
        </main>
    );
}