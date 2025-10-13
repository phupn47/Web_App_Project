"use client"

import Image from "next/image";
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
            <div className="mb-16">
                <h1 className="text-neutral-900 text-3xl font-bold mb-4 tracking-wide">Temperature Log Form</h1>
                <p className="text-neutral-900">Use this form to log the drone's temperature in Celsius. the data will be saved along with the drone info from the Config page.</p>
            </div>
            <div className="flex gap-16">
                <Image
                    src="/images/drone-form.png"
                    alt="Drone_form"
                    width={300}
                    height={300}
                />
                <form onSubmit={handleSubmit} className="flex flex-col justify-center gap-8 w-[500px]">
                    <input
                        type="number"
                        placeholder="Enter temperature in Celsius"
                        value={celsius}
                        onChange={(e) => setCelsius(e.target.value)}
                        className="border border-neutral-900 pl-6 py-4 rounded-lg w-full bg-blue-50"
                    />
                    <button
                        type="submit"
                        className="bg-blue-900 text-white px-6 py-4 rounded-lg hover:bg-blue-800 cursor-pointer w-fit"
                    >
                        Submit data
                    </button>
                    {message && <p className="text-blue-900 font-semibold">{message}</p>}
                </form>
            </div>
        </main>
    );
}