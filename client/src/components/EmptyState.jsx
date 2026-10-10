export default function EmptyState({ title, description, action }) {
  return <section className="empty-state"><div><h2>{title}</h2><p>{description}</p>{action && <div style={{ marginTop: 18 }}>{action}</div>}</div></section>;
}
