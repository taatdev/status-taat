import { useEffect, useState } from "react";
import { services, type IService } from "./services";
import { StatusCard } from "./components/StatusCard";

interface StatusMap {
  [key: string]: "UP" | "DOWN" | "CHECKING";
}

export default function App() {
  const [status, setStatus] = useState<StatusMap>({});
  const [lastCheck, setLastCheck] = useState<string>("");

  const checkStatus = async () => {
    const results: StatusMap = {};

    await Promise.all(
      services.map(async (svc: IService) => {
        try {
          await fetch(svc.url, { method: "GET", mode: "no-cors" });
          results[svc.name] = "UP";
        } catch {
          results[svc.name] = "DOWN";
        }
      })
    );

    setStatus(results);
    setLastCheck(new Date().toLocaleString());
  };

  useEffect(() => {
    const init: StatusMap = {};
    services.forEach((s) => (init[s.name] = "CHECKING"));
    setStatus(init);

    checkStatus();
    const interval = setInterval(checkStatus, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={styles.page}>
      {/* HEADER */}
      <header style={styles.header}>
        <h1 style={styles.title}>Status Layanan TAAT</h1>
        <p style={styles.subtitle}>Pantau kesehatan layanan sistem TAAT secara real-time</p>

        <p style={styles.lastCheck}>
          Last Checked: <strong>{lastCheck || "Checking..."}</strong>
        </p>

        {/* LEGEND */}
        <div style={styles.legendContainer}>
          <div style={styles.legendItem}>
            <span className="legend-dot up"></span> <span>UP</span>
          </div>
          <div style={styles.legendItem}>
            <span className="legend-dot down"></span> <span>DOWN</span>
          </div>
          <div style={styles.legendItem}>
            <span className="legend-dot checking"></span> <span>CHECKING</span>
          </div>
        </div>
      </header>

      {/* STATUS LIST */}
      <div className="page-container">
        {services.map((svc) => (
          <StatusCard
            key={svc.name}
            name={svc.name}
            url={svc.url}
            status={status[svc.name]}
          />
        ))}
      </div>

      {/* EXTRA INFO SECTION */}
      <section style={styles.infoSection}>
        <h2 style={styles.infoTitle}>Tentang Status Sistem</h2>
        <p style={styles.infoText}>
          Dashboard ini memonitor layanan utama di ekosistem TAAT, termasuk website,
          landing page, dan API inti. Status diperbarui otomatis setiap <strong>10 detik</strong>.
        </p>

        <ul style={styles.infoList}>
          <li>✔ Pemantauan uptime otomatis</li>
          <li>✔ Pengecekan HTTP via direct request</li>
          <li>✔ Indikator status real-time</li>
        </ul>
      </section>

      {/* FOOTER */}
      <footer style={styles.footer}>
        © {new Date().getFullYear()} TAAT — Sistem Monitoring Layanan
      </footer>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    padding: "50px 20px",
    background: "linear-gradient(135deg, #002D31, #00464B)",
    color: "white",
    fontFamily: "Inter, sans-serif",
  },
  header: {
    textAlign: "center",
    marginBottom: "28px",
  },
  title: {
    fontSize: "36px",
    fontWeight: 700,
    marginBottom: "6px",
  },
  subtitle: {
    opacity: 0.8,
    fontSize: "16px",
    marginBottom: "6px",
  },
  lastCheck: {
    fontSize: "14px",
    opacity: 0.85,
    marginTop: "6px",
  },

  /* LEGEND */
  legendContainer: {
    marginTop: "14px",
    display: "flex",
    justifyContent: "center",
    gap: "20px",
  },
  legendItem: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "14px",
    opacity: 0.85,
  },

  /* INFO SECTION */
  infoSection: {
    marginTop: "50px",
    marginBottom: "50px",
    textAlign: "center",
    maxWidth: "700px",
    marginInline: "auto",
  },
  infoTitle: {
    fontSize: "24px",
    fontWeight: 700,
    marginBottom: "12px",
  },
  infoText: {
    opacity: 0.85,
    fontSize: "15px",
    marginBottom: "18px",
  },
  infoList: {
    listStyle: "none",
    padding: 0,
    opacity: 0.9,
    lineHeight: "1.8",
    fontSize: "15px",
  },

  footer: {
    textAlign: "center",
    opacity: 0.5,
    marginTop: "80px",
    fontSize: "13px",
  },
};
