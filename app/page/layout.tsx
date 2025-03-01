import React from "react";
import Image from "next/image";

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full w-full flex flex-col items-center">
      <div className="h-96 pt-28 flex flex-row-reverse items-center justify-center overflow-hidden bg-theme-primary w-full relative">
        <Image
          src="/main-hero-image.png"
          width={400}
          height={400}
          alt="Placeholder"
        />
        <div>
          <p className="text-sm text-center text-white">
            The best place to find everything about pokemon
          </p>
          <h2 className="text-7xl font-black text-theme-secondary">
            Poke Cards
          </h2>
        </div>
      </div>
      {children}
    </div>
  );
}
