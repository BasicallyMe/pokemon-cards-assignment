"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";

export default function Navigation() {
  const pathname = usePathname();
  return (
    <div
      className={`h-28 w-full flex items-center ${
        pathname === "/" ? "justify-center" : "justify-start"
      } fixed px-4 pointer-events-none`}
    >
      <Image src="/logo.png" width={200} height={100} alt="Placeholder" />
    </div>
  );
}
