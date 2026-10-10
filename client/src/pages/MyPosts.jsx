import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HiPlus } from "react-icons/hi2";
import Navbar from "../components/Navbar";
import ItemCard from "../components/ItemCard";
import PageHeader from "../components/PageHeader";
import EmptyState from "../components/EmptyState";
import API from "../services/api";
import "./MyPostsPage.css";

export default function MyPosts() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => { API.get("/items/mine").then((res) => setItems(res.data.data || [])).catch(() => setError("Your reports could not be loaded. Please try again.")).finally(() => setLoading(false)); }, []);
  return <div className="app-page"><Navbar /><main className="page-shell my-posts-page"><PageHeader eyebrow="Your contributions" title="Reports you’ve entrusted to the archive." intro="Track moderation and follow each item through its journey home." actions={<Link className="button button-primary" to="/post-lost"><HiPlus /> New report</Link>} />{loading ? <div className="loading-state">Loading your reports…</div> : error ? <section className="error-state"><div><h2>Reports unavailable</h2><p>{error}</p></div></section> : items.length ? <div className="archive-grid">{items.map((item) => <ItemCard key={item._id} item={item} />)}</div> : <EmptyState title="Your archive is clear" description="When you report a lost or found item, its status will live here." action={<Link className="button button-primary" to="/post-lost">Make your first report</Link>} />}</main></div>;
}
