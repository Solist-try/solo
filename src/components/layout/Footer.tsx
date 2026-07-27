import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div>
          <p className={styles.brand}>Go Solo</p>
          <p className={styles.tagline}>
            Independent paths, shared wisdom.
          </p>
        </div>
        <div className={styles.links}>
          <Link to="/community">Community</Link>
          <Link to="/resources">Resources</Link>
          <Link to="/settings">Settings</Link>
        </div>
        <p className={styles.copy}>© {new Date().getFullYear()} Go Solo</p>
      </div>
    </footer>
  );
}
