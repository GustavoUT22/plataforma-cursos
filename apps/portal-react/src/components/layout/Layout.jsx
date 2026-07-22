import { useState } from "react";
import Navbar from "./Navbar";
import MobileNav from "./MobileNav";

export default function Layout({ children }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <>
      <Navbar
        userName="Carlos G."
        userInitials="CG"
        mobileNavOpen={mobileNavOpen}
        onToggleMobileNav={() => setMobileNavOpen((prev) => !prev)}
      />
      <MobileNav isOpen={mobileNavOpen} />
      <div className="page-content">{children}</div>
    </>
  );
}