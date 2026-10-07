import { Link } from "react-router-dom";
import "./ItemCard.css";

export default function ItemCard({ item }) {
  return (
    <Link to={`/item/${item._id}`} className="itemLink">
      <div className="itemCard">
        <img
          src={
            item.photoUrl ||
            "https://placehold.co/400x300?text=No+Image"
          }
          alt={item.title}
        />

        <div className="itemInfo">
          <div className="topRow">
            <span className={`badge ${item.type}`}>
              {item.type.toUpperCase()}
            </span>

            <span className={`status ${item.status}`}>
              {item.status}
            </span>
          </div>

          <h3>{item.title}</h3>

          <p>{item.description}</p>

          <div className="meta">
            <span>{item.category}</span>
            <span>{item.location}</span>
          </div>

          <small>
            {new Date(item.date).toLocaleDateString()}
          </small>
        </div>
      </div>
    </Link>
  );
}