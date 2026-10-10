import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HiArrowUpRight, HiMagnifyingGlass, HiPlus, HiSparkles } from "react-icons/hi2";
import API from "../services/api";
import Navbar from "../components/Navbar.jsx";
import ItemCard from "../components/ItemCard.jsx";
import EmptyState from "../components/EmptyState.jsx";
import "./Dashboard.css";

export default function Dashboard() {
  const [data, setData] = useState({ lost: [], found: [], stats: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDashboard() {
      try {
        const [lost, found, returned] = await Promise.all([
          API.get("/items?type=lost&limit=4"),
          API.get("/items?type=found&limit=4"),
          API.get("/items?status=returned&limit=1"),
        ]);
        setData({
          lost: lost.data.data || [],
          found: found.data.data || [],
          stats: { lost: lost.data.totalItems ?? 0, found: found.data.totalItems ?? 0, returned: returned.data.totalItems ?? 0 },
        });
      } catch {
        setError("We couldn’t load today’s campus archive. Please refresh to try again.");
      } finally {
        setLoading(false);
      }
    }
    loadDashboard();
  }, []);

  const latest = [...data.lost, ...data.found].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 4);

  return (
    <div className="app-page"><Navbar />
      <main className="dashboard page-shell">
        <section className="welcome-ledger">
          <div className="welcome-ledger__copy">
            <p className="eyebrow"><HiSparkles /> A shared campus archive</p>
            <h1>Things go missing.<br /><em>People show up.</em></h1>
            <p>CampusCrate gives every misplaced belonging a clear path back to its person—one thoughtful report at a time.</p>
            <div className="welcome-ledger__actions">
              <Link className="button button-primary" to="/post-lost"><HiPlus /> Report something lost</Link>
              <Link className="button button-secondary" to="/found"><HiMagnifyingGlass /> Browse found items</Link>
            </div>
          </div>
          <div className="welcome-ledger__mark" aria-hidden="true">
            <span>01</span><strong>FOUND<br />FORWARD</strong><i />
          </div>
        </section>

        {loading ? <div className="loading-state">Gathering the latest reports…</div> : error ? <section className="error-state"><div><h2>Dashboard unavailable</h2><p>{error}</p></div></section> : <>
          <section className="archive-stats" aria-label="CampusCrate archive summary">
            <div><span>Currently reported</span><strong>{data.stats.lost + data.stats.found}</strong><p>active archive entries</p></div>
            <div><span>Found items</span><strong>{data.stats.found}</strong><p>waiting to be recognized</p></div>
            <div><span>Returned</span><strong>{data.stats.returned}</strong><p>reunions recorded here</p></div>
          </section>
          <section className="dashboard-section">
            <div className="section-heading"><div><p className="eyebrow">Newly recorded</p><h2>Latest around campus</h2></div><Link to="/lost">View all listings <HiArrowUpRight /></Link></div>
            {latest.length ? <div className="archive-grid dashboard-grid">{latest.map((item) => <ItemCard key={item._id} item={item} />)}</div> : <EmptyState title="The archive is waiting for its first entry" description="When a student reports an item, it will appear here for the community to find." />}
          </section>
        </>}
      </main>
    </div>
  );
}
