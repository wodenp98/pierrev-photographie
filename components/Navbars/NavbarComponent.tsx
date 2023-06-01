"use client";

import { usePathname } from "next/navigation";
import NavbarBackPage from "./NavbarBackPage";
import NavbarHomePage from "./NavbarHomePage";

export default function NavbarComponent() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return <>{isHomePage ? <NavbarHomePage /> : <NavbarBackPage />}</>;
}
