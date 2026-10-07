import "./ItemCard.css";

function ItemCard({ image, title, location, date, status, onClick }) {
    return (
        <div className="item-card" onClick={onClick}>

            <img 
                src={image} 
                alt={title} 
                className="item-image" 
            />

            <div className="item-content">
                <h3>{title}</h3>

                <p className="location">{location}</p>

                <div className="item-footer">
                    <span>{date}</span>

                    <span className={`status ${status.toLowerCase()}`}>
                        {status}
                    </span>
                </div>

            </div>

        </div>
    );
}

export default ItemCard;