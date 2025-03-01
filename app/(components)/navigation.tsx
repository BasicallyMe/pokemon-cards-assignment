"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function Navigation() {
  const pathname = usePathname();
  return (
    <div
      className={`h-28 w-full flex items-center ${
        pathname === "/" ? "justify-center" : "justify-start"
      } fixed px-4 bg-white/40 backdrop-blur-sm`}
    >
      <Link href="/">
        <Image src="/logo.png" width={200} height={100} alt="Placeholder" />
      </Link>
    </div>
  );
}
