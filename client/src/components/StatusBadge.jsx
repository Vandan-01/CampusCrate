const labels = { active: "Active", claimed: "Claim in progress", returned: "Returned", pending: "In review", approved: "Approved", rejected: "Not approved", lost: "Lost", found: "Found", reviewed: "Reviewed", resolved: "Resolved" };

export default function StatusBadge({ status, className = "" }) {
  const safeStatus = status || "pending";
  return <span className={`status-badge status-badge--${safeStatus} ${className}`}>{labels[safeStatus] || safeStatus}</span>;
}
