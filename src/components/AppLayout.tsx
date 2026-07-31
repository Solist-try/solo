import { Outlet } from "react-router-dom";
import { BottomNav } from "./layout/BottomNav";
import { Footer } from "./layout/Footer";
import { Navbar } from "./layout/Navbar";

export type AppLayoutProps = {
  /** Show sticky mobile bottom navigation (hidden from 900px up). */
  showBottomNav?: boolean;
  /** Show the site footer beneath main content. */
  showFooter?: boolean;
};

/**
 * Global GoSolo UI shell:
 * top navigation · main content · optional mobile bottom navigation.
 */
export function AppLayout({
  showBottomNav = true,
  showFooter = true,
}: AppLayoutProps = {}) {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="app-main">
        <Outlet />
      </main>
      {showFooter ? <Footer /> : null}
      {showBottomNav ? (
        <div className="app-bottom-nav" data-testid="app-bottom-nav">
          <BottomNav />
        </div>
      ) : null}
    </div>
  );
}

export default AppLayout;
