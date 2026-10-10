import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiArrowLeft, HiCheckCircle, HiCloudArrowUp, HiPhoto, HiXMark } from "react-icons/hi2";
import API from "../services/api";
import Navbar from "./Navbar";
import "./ReportForm.css";

const categories = ["Electronics", "Bottle", "Book", "ID Card", "Bag", "Keys", "Others"];

export default function ReportForm({ type }) {
  const navigate = useNavigate();
  const isLost = type === "lost";
  const [form, setForm] = useState({ title: "", description: "", category: "Electronics", location: "", date: "", claimQuestion: "", tags: "" });
  const [photo, setPhoto] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const previewUrl = useMemo(() => (photo ? URL.createObjectURL(photo) : ""), [photo]);
  useEffect(() => () => { if (previewUrl) URL.revokeObjectURL(previewUrl); }, [previewUrl]);

  function change(event) { setForm({ ...form, [event.target.name]: event.target.value }); }
  function selectPhoto(event) { setPhoto(event.target.files?.[0] || null); }

  async function submit(event) {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const payload = new FormData();
      payload.append("type", type);
      Object.entries(form).forEach(([key, value]) => payload.append(key, value));
      if (photo) payload.append("photo", photo);
      await API.post("/items", payload, { headers: { "Content-Type": "multipart/form-data" } });
      navigate(isLost ? "/lost" : "/found", { replace: true, state: { notice: "Your report is now with the CampusCrate moderators." } });
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Your report could not be submitted. Please check the fields and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return <div className="app-page"><Navbar /><main className="page-shell report-page">
    <button type="button" className="back-link" onClick={() => navigate(-1)}><HiArrowLeft /> Back</button>
    <div className="report-layout">
      <aside className="report-aside">
        <p className="eyebrow">{isLost ? "Lost item report" : "Found item report"}</p>
        <h1>{isLost ? "Give it a way back to you." : "You found it. Let’s help it get home."}</h1>
        <p>{isLost ? "Share the details someone needs to recognize your belonging. Reports are reviewed before they are added to the archive." : "A thoughtful report can turn a small act of care into a quick reunion. Avoid publishing sensitive details that only the owner should know."}</p>
        <ol className="report-steps"><li><span>01</span> Describe the item clearly</li><li><span>02</span> Add where and when it was {isLost ? "lost" : "found"}</li><li><span>03</span> Set one detail to verify a claimant</li></ol>
      </aside>
      <form className="report-form" onSubmit={submit} noValidate>
        <div className="report-form__heading"><div><p className="eyebrow">The details</p><h2>Record the essentials</h2></div><span className="report-form__required">* Required</span></div>
        {error && <p className="form-error" role="alert">{error}</p>}
        <div className="report-form__grid">
          <label className="field report-form__full"><span className="field-label">What is the item? *</span><input className="input" required name="title" value={form.title} onChange={change} placeholder="e.g. Navy blue Herschel backpack" /></label>
          <label className="field report-form__full"><span className="field-label">Description *</span><textarea className="textarea" required name="description" value={form.description} onChange={change} placeholder="Include distinctive features, but keep private identifiers for the verification question." /></label>
          <label className="field"><span className="field-label">Category *</span><select className="select" name="category" value={form.category} onChange={change}>{categories.map((category) => <option key={category}>{category}</option>)}</select></label>
          <label className="field"><span className="field-label">Where was it {isLost ? "last seen" : "found"}? *</span><input className="input" required name="location" value={form.location} onChange={change} placeholder="e.g. Library, second floor" /></label>
          <label className="field"><span className="field-label">When? *</span><input className="input" required type="date" name="date" value={form.date} onChange={change} max={new Date().toISOString().split("T")[0]} /></label>
          <label className="field"><span className="field-label">Tags</span><input className="input" name="tags" value={form.tags} onChange={change} placeholder="e.g. black, canvas, laptop" /><span className="field-hint">Separate with commas.</span></label>
          <label className="field report-form__full"><span className="field-label">Verification question</span><input className="input" required name="claimQuestion" value={form.claimQuestion} onChange={change} placeholder="e.g. What is the sticker on the front?" /><span className="field-hint">Claimants answer this privately. Do not put the answer in the public description.</span></label>
        </div>
        <div className="photo-field"><span className="field-label">Photo <small>Optional, but helpful</small></span>{previewUrl ? <div className="photo-preview"><img src={previewUrl} alt="Selected item preview" /><button type="button" onClick={() => setPhoto(null)} aria-label="Remove selected photo"><HiXMark /></button></div> : <label className="photo-drop"><HiCloudArrowUp /><strong>Add a clear photo</strong><span>PNG, JPG, or WEBP · up to 5 MB</span><input type="file" accept="image/*" onChange={selectPhoto} /></label>}</div>
        <div className="report-form__footer"><p><HiCheckCircle /> Your report will be reviewed before it becomes visible.</p><button className="button button-primary" disabled={submitting} type="submit">{submitting ? "Submitting report…" : isLost ? "Submit lost report" : "Submit found report"}</button></div>
      </form>
    </div>
  </main></div>;
}
