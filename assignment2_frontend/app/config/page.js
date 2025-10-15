"use client"

import { useEffect, useState } from "react"
import Image from "next/image";

const MY_DRONE_ID = process.env.NEXT_PUBLIC_MY_DRONE_ID;
const MY_API_URL = process.env.NEXT_PUBLIC_MY_API_URL;

export default function ConfigPage() {
    const [config, setConfig] = useState(null);

    useEffect(() => {
        fetch(`${MY_API_URL}/configs/${MY_DRONE_ID}`)
            .then((res) => res.json())
            .then((data) => {
                setConfig(data);
                localStorage.setItem("droneConfig", JSON.stringify(data)); // collect data for use next page
            });
    }, []);

    if (!config) return (
        <main className="text-xl text-neutral-900 font-semibold p-8 text-center">
            <p>Loading...</p>
        </main>
    );

    return (
        <main className="p-8">
            <div className="mb-16">
                <h1 className="text-neutral-900 text-3xl font-bold mb-4 tracking-wide">Drone Configuration</h1>
                <p className="text-neutral-900">The loaded data will be saved to Local Storage for later use in other pages.</p>
            </div>
            <div className="flex gap-16">
                <Image
                    src="/images/drone-config.png"
                    alt="Drone_config"
                    width={300}
                    height={300}
                />
                <div className="w-[500px] h-fit flex border border-blue-900 bg-blue-50 p-8 rounded-lg">
                    <div className="flex flex-col text-neutral-900 text-xl font-semibold gap-8 mr-8">
                        <p>Drone ID</p>
                        <p>Drone Name</p>
                        <p>Light</p>
                        <p>Country</p>
                    </div>
                    <div className="flex flex-col text-neutral-900 text-xl gap-8">
                        <p>{config.drone_id}</p>
                        <p>{config.drone_name}</p>
                        <p>{config.light}</p>
                        <p>{config.country}</p>
                    </div>
                </div>
            </div>
        </main>
    );
}