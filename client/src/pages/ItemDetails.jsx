import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { HiArrowLeft, HiFlag, HiMapPin, HiCalendarDays } from "react-icons/hi2";
import API from "../services/api";
import Navbar from "../components/Navbar";
import StatusBadge from "../components/StatusBadge";
import ItemCard from "../components/ItemCard";
import { useAuth } from "../context/AuthContext";
import "./ItemDetails.css";

export default function ItemDetails() {

    const { id } = useParams();

    const [item, setItem] = useState(null);
    const [matches, setMatches] = useState([]);
    const [message, setMessage] = useState("");
    const [answer, setAnswer] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const { user } = useAuth();

    useEffect(() => {

        loadItem();

    }, []);

    const loadItem = async () => {

        try {

            const res = await API.get(`/items/${id}`);

            setItem(res.data.data);

            const match = await API.get(`/items/${id}/matches`);

            setMatches(match.data.data);

        } catch { setError("This report could not be found or is no longer available."); }

        setLoading(false);

    }

    const claimItem = async () => { setSubmitting(true); setError(""); try { await API.post("/claims", { itemId: item._id, message, answer }); setMessage(""); setAnswer(""); } catch (err) { setError(err.response?.data?.message || "Your claim could not be submitted."); } finally { setSubmitting(false); } }

    async function reportItem() {

        try {

            await API.post("/reports", {

                itemId: item._id,

                reason: "Spam"

            });

            alert("Report submitted");

        } catch (err) {

            alert(err.response?.data?.message);

        }

    }

    const markReturned = async () => {

        try {

            await API.patch(`/items/${item._id}/returned`);

            alert("Marked Returned");

            loadItem();

        } catch (err) {

            alert(err.response?.data?.message);

        }

    }

    if (loading) return <div className="loading-state">Opening report…</div>;
    if (error && !item) return <div className="error-state"><div><h2>Report unavailable</h2><p>{error}</p><Link className="button button-secondary" to="/lost">Back to archive</Link></div></div>;
    const isOwner = String(item.postedBy?._id || item.postedBy) === String(user?._id);

    return (

        <div className="app-page"><Navbar /><main className="page-shell item-detail-page"><Link className="back-link" to={item.type === "lost" ? "/lost" : "/found"}><HiArrowLeft /> Back to archive</Link><div className="detail-layout"><div className="detail-image">{item.photoUrl ? <img src={item.photoUrl} alt={item.title} /> : <div>Photo unavailable</div>}</div><section className="detail-record"><div className="detail-record__top"><span className={`item-type item-type--${item.type}`}>{item.type}</span><StatusBadge status={item.status} /></div><h1>{item.title}</h1><p className="detail-description">{item.description}</p><div className="detail-meta"><span><HiMapPin /> {item.location}</span><span><HiCalendarDays /> {new Date(item.date).toLocaleDateString()}</span><span>{item.category}</span></div>{error && <p className="claims-error">{error}</p>}{!isOwner && item.status === "active" && <div className="claim-form"><h2>Think this is yours?</h2><p>Tell the reporter what makes it identifiable. Your response stays between the people involved.</p><label className="field"><span className="field-label">Message *</span><textarea className="textarea" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Share the details that help establish ownership." /></label><label className="field"><span className="field-label">Verification: {item.claimQuestion || "Describe one identifying detail"}</span><input className="input" value={answer} onChange={(e) => setAnswer(e.target.value)} /></label><button className="button button-primary" disabled={submitting || !message || !answer} onClick={claimItem}>{submitting ? "Submitting…" : "Submit private claim"}</button></div>}{isOwner && item.status === "claimed" && <button className="button button-primary" onClick={markReturned}>Mark as returned</button>}<button className="report-link" onClick={reportItem}><HiFlag /> Report this listing</button></section></div>{matches.length > 0 && <section className="matches"><p className="eyebrow">Possible connections</p><h2>Could one of these be related?</h2><div className="archive-grid">{matches.slice(0, 4).map((match) => <ItemCard key={match._id} item={match} />)}</div></section>}</main></div>

    )

}
