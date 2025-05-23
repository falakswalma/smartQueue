import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "../../public/logo.jpg";
export default function Logo() {
  return (
    <Link href="/" className="mr-6 flex items-center space-x-2">
      <Image alt="Medical Logo" src={logo} className="h-16 lg:h-14 w-auto" />
    </Link>
  );
}
