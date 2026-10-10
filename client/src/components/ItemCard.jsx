import { Link } from "react-router-dom";
import { HiMapPin, HiCalendarDays, HiPhoto } from "react-icons/hi2";
import StatusBadge from "./StatusBadge";
import "./ItemCard.css";

export default function ItemCard({ item }) {
  const formattedDate = item.date ? new Intl.DateTimeFormat(undefined, { month: "short", day: "numeric", year: "numeric" }).format(new Date(item.date)) : "Date unavailable";

  return (
    <Link to={`/item/${item._id}`} className="item-card-link" aria-label={`View ${item.title}`}>
      <article className="archive-card">
        <div className="archive-card__image">
          {item.photoUrl ? <img src={item.photoUrl} alt={item.title} /> : <div className="archive-card__image-empty"><HiPhoto /><span>Photo unavailable</span></div>}
          <span className={`item-type item-type--${item.type}`}>{item.type}</span>
        </div>
        <div className="archive-card__body">
          <div className="archive-card__meta"><span>{item.category}</span><StatusBadge status={item.status} /></div>
          <h3>{item.title}</h3>
          <p className="archive-card__description">{item.description}</p>
          <div className="archive-card__details">
            <span><HiMapPin />{item.location}</span>
            <span><HiCalendarDays />{formattedDate}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
