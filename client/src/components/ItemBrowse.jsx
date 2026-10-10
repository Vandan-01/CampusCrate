import { useCallback, useEffect, useState } from "react";
import { HiMagnifyingGlass, HiAdjustmentsHorizontal } from "react-icons/hi2";
import API from "../services/api";
import Navbar from "./Navbar";
import PageHeader from "./PageHeader";
import EmptyState from "./EmptyState";
import ItemCard from "./ItemCard";
import "./ItemBrowse.css";

const categories = ["All categories", "Electronics", "Bottle", "Book", "ID Card", "Bag", "Keys", "Others"];

export default function ItemBrowse({ type }) {
  const copy = type === "lost"
    ? { eyebrow: "The lost archive", title: "Find the thing that matters.", intro: "Search verified reports from across campus. A precise description helps someone recognize what belongs to you.", empty: "There are no lost-item reports matching this search." }
    : { eyebrow: "The found archive", title: "Good finds deserve a way home.", intro: "Browse belongings that fellow students and staff have safely reported. Claim only when you can identify the item.", empty: "There are no found-item reports matching this search." };
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({ search: "", category: "", location: "", status: "active" });
  const [appliedFilters, setAppliedFilters] = useState(filters);

  const loadItems = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams({ type, limit: "24" });
      Object.entries(appliedFilters).forEach(([key, value]) => { if (value) params.set(key, value); });
      const { data } = await API.get(`/items?${params.toString()}`);
      setItems(data.data || []);
    } catch {
      setError("We couldn’t load the archive right now. Please try again shortly.");
    } finally {
      setLoading(false);
    }
  }, [type, appliedFilters]);

  useEffect(() => { loadItems(); }, [loadItems]);
  function submitSearch(event) { event.preventDefault(); setAppliedFilters(filters); }

  return (
    <div className="app-page"><Navbar /><main className="page-shell browse-page">
      <PageHeader {...copy} />
      <form className="archive-filter" onSubmit={submitSearch}>
        <label className="archive-filter__search"><HiMagnifyingGlass /><span className="screen-reader-only">Search listings</span><input value={filters.search} onChange={(event) => setFilters({ ...filters, search: event.target.value })} placeholder="Search by name, description, or tag" /></label>
        <label className="archive-filter__select"><span className="screen-reader-only">Category</span><select value={filters.category} onChange={(event) => setFilters({ ...filters, category: event.target.value })}>{categories.map((category) => <option key={category} value={category === "All categories" ? "" : category}>{category}</option>)}</select></label>
        <label className="archive-filter__select archive-filter__location"><span className="screen-reader-only">Location</span><input value={filters.location} onChange={(event) => setFilters({ ...filters, location: event.target.value })} placeholder="Any campus location" /></label>
        <button className="button button-primary" type="submit"><HiAdjustmentsHorizontal /> Apply</button>
      </form>
      {loading ? <div className="loading-state">Loading the archive…</div> : error ? <section className="error-state"><div><h2>Archive unavailable</h2><p>{error}</p><button className="button button-secondary" type="button" onClick={loadItems}>Try again</button></div></section> : items.length ? <div className="archive-grid">{items.map((item) => <ItemCard key={item._id} item={item} />)}</div> : <EmptyState title="Nothing here just yet" description={copy.empty} />}
    </main></div>
  );
}
