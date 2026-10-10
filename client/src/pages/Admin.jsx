import { useEffect, useState } from "react";
import { HiCheck, HiMagnifyingGlass, HiNoSymbol, HiUsers } from "react-icons/hi2";
import Navbar from "../components/Navbar";
import API from "../services/api";
import PageHeader from "../components/PageHeader";
import StatusBadge from "../components/StatusBadge";
import EmptyState from "../components/EmptyState";
import "./Admin.css";

export default function Admin() {
  const [stats, setStats] = useState(null);
  const [pendingItems, setPendingItems] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [busyId, setBusyId] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const dashboard = await API.get("/admin/dashboard");
      const items = await API.get("/admin/items/pending");
      const allUsers = await API.get("/admin/users");

      setStats(dashboard.data.data);
      setPendingItems(items.data.data);
      setUsers(allUsers.data.data);
    } catch { setError("Moderation data could not be loaded. Please try again."); }
    finally { setLoading(false); }
  }

  async function moderate(id, status) {
    setBusyId(id);
    try {
      await API.patch(`/admin/items/${id}/moderate`, {
        approvalStatus: status,
      });

      loadData();
    } catch (err) { setError(err.response?.data?.message || "This report could not be updated."); }
    finally { setBusyId(""); }
  }

  if (loading) return <div className="loading-state">Opening moderation workspace…</div>;
  const filteredUsers = users.filter((user) => `${user.name} ${user.email} ${user.role}`.toLowerCase().includes(search.toLowerCase()));

  return (
    <>
      <Navbar />

      <main className="page-shell moderation-page"><PageHeader eyebrow="Administrative review" title="Keep the archive trustworthy." intro="Review new listings, watch for flags, and maintain a safe space for the campus community." />
        {error && <p className="moderation-error" role="alert">{error}</p>}
        <section className="moderation-stats" aria-label="Moderation summary"><div><span>Awaiting review</span><strong>{stats?.pendingItems ?? 0}</strong><p>new item reports</p></div><div><span>Open claims</span><strong>{stats?.pendingClaims ?? 0}</strong><p>requiring a decision</p></div><div><span>Reports</span><strong>{stats?.reports ?? 0}</strong><p>community flags</p></div><div><span>Blocked accounts</span><strong>{stats?.blockedUsers ?? 0}</strong><p>restricted access</p></div></section>
        <section className="moderation-section"><div className="moderation-section__heading"><div><p className="eyebrow">Listing queue</p><h2>New reports to review</h2></div><span>{pendingItems.length} pending</span></div>{pendingItems.length ? <div className="review-list">{pendingItems.map((item) => <article className="review-card" key={item._id}>{item.photoUrl ? <img src={item.photoUrl} alt="" /> : <div className="review-card__image">No photo</div>}<div className="review-card__copy"><div><span className={`item-type item-type--${item.type}`}>{item.type}</span><h3>{item.title}</h3></div><p>{item.description}</p><small>{item.category} · {item.location} · Posted by {item.postedBy?.name || "Campus member"}</small></div><div className="review-card__actions"><button className="button button-primary" disabled={busyId === item._id} onClick={() => moderate(item._id, "approved")}><HiCheck /> Approve</button><button className="button button-secondary" disabled={busyId === item._id} onClick={() => moderate(item._id, "rejected")}><HiNoSymbol /> Decline</button></div></article>)}</div> : <EmptyState title="The review queue is clear" description="New reports will appear here as soon as students submit them." />}</section>
        <section className="moderation-section"><div className="moderation-section__heading"><div><p className="eyebrow">Community directory</p><h2>People on CampusCrate</h2></div><label className="user-search"><HiMagnifyingGlass /><span className="screen-reader-only">Search people</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search name or email" /></label></div><div className="user-table-wrap"><table className="user-table"><thead><tr><th>Member</th><th>Role</th><th>Access</th></tr></thead><tbody>{filteredUsers.map((user) => <tr key={user._id}><td><strong>{user.name}</strong><small>{user.email}</small></td><td>{user.role}</td><td><StatusBadge status={user.blocked ? "rejected" : "active"} /></td></tr>)}</tbody></table></div></section>
      </main>
    </>
  );
}
