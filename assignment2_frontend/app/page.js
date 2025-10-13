"use client"

import Image from "next/image";

export default function Home() {
  return (
    <main className="p-8 text-center">
      <h1 className="text-3xl text-neutral-900 font-bold mb-16 tracking-wide">Drone Monitoring Dashboard</h1>
      <Image
        src="/images/drone-home.png"
        alt="Drone_home"
        width={300}
        height={300}
        className="mx-auto mb-16"
      />
      <div className="flex flex-col gap-8">
        <p className="text-xl text-neutral-900 font-semibold">
          Monitor and manage your drone efficiently!
        </p>
        <p className="text-neutral-900 font-medium">
          Start by visiting <span className="text-blue-900 font-semibold">View Config</span> to load your drone data<br />before accessing other pages.
        </p>
      </div>

    </main>
  );
}