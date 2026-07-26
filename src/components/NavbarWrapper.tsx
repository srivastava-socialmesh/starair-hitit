import { Suspense } from "react";
import Navbar from "./sections/Navbar";

interface NavbarWrapperProps {
  activeMenu?: string;
  onMenuChange?: (id: string) => void;
}

export default function NavbarWrapper({ activeMenu = "flights", onMenuChange = () => {} }: NavbarWrapperProps) {
  return (
    <Suspense fallback={<div className="h-20" />}>
      <Navbar activeMenu={activeMenu} onMenuChange={onMenuChange} />
    </Suspense>
  );
}
