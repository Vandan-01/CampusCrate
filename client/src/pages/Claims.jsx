import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { HiCheck, HiXMark } from "react-icons/hi2";
import Navbar from "../components/Navbar";
import API from "../services/api";
import PageHeader from "../components/PageHeader";
import StatusBadge from "../components/StatusBadge";
import EmptyState from "../components/EmptyState";
import "./Claims.css";

export default function Claims() {

const [claims,setClaims]=useState([]);

const [loading,setLoading]=useState(true);
const [error,setError]=useState("");
const [busy,setBusy]=useState("");
const { user }=useAuth();

useEffect(()=>{

loadClaims();

},[]);

async function loadClaims(){

try{

const res=await API.get("/claims");

setClaims(res.data.data || []);

}catch(err){

setError("Claims could not be loaded right now.");

}

setLoading(false);

}

async function updateClaim(id,status){

setBusy(id);
try{

await API.patch(`/claims/${id}`,{

status

});

loadClaims();

}catch(err){

setError(err.response?.data?.message || "That claim could not be updated.");

}finally{

setBusy("");

}

}

if (loading) return <div className="loading-state">Opening the claim desk…</div>;

return <div className="app-page"><Navbar /><main className="page-shell claims-page">
  <PageHeader eyebrow="Claim desk" title="Follow each request with care." intro="Only the people involved in a report can see its claim activity." />
  {error && <p className="claims-error" role="alert">{error}</p>}
  {claims.length ? <div className="claims-list">{claims.map((claim) => {
    const canModerate = user?.role === "admin";
    const canSeeAnswer = canModerate || String(claim.itemId?.postedBy) === String(user?._id);
    return <article key={claim._id} className="claim-card"><div className="claim-card__main"><div className="claim-card__title"><div><p className="eyebrow">Claim for</p><h2>{claim.itemId?.title || "Removed item"}</h2></div><StatusBadge status={claim.status} /></div><p className="claim-card__person">Submitted by <strong>{claim.claimantId?.name || "Campus member"}</strong></p><p className="claim-card__message">{claim.message}</p>{canSeeAnswer && <div className="claim-card__answer"><span>Verification response</span><p>{claim.answer}</p></div>}</div>{claim.status === "pending" && canModerate && <div className="claim-card__actions"><button className="button button-primary" disabled={busy === claim._id} onClick={() => updateClaim(claim._id, "approved")}><HiCheck /> Approve</button><button className="button button-secondary" disabled={busy === claim._id} onClick={() => updateClaim(claim._id, "rejected")}><HiXMark /> Decline</button></div>}</article>;
  })}</div> : <EmptyState title="No claims to review" description="When an item you’ve reported receives a claim—or when you submit one—it will appear here." />}
</main></div>;
}
