"use client";
import { useState } from "react";
import Navbar from "./sections/Navbar";

interface NavbarClientProps {
  activeMenu?: string;
}

export default function NavbarClient({ activeMenu = "flights" }: NavbarClientProps) {
  const [menu, setMenu] = useState(activeMenu);

  const handleMenuChange = (id: string) => {
    setMenu(id);
  };

  return <Navbar activeMenu={menu} onMenuChange={handleMenuChange} />;
}
