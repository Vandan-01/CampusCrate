import "./ItemDetails.css";
import { useNavigate, useParams } from "react-router-dom";

function ItemDetails() {

    const navigate = useNavigate();
    const { id, type } = useParams();

    return (
        <div className="item-details-page">

            <button 
                className="back-btn"
                onClick={() => navigate(-1)}
            >
                ← Back
            </button>


            <div className="details-card">

                <img 
                    src="https://placehold.co/400x250?text=Wallet"
                    alt="item"
                    className="details-image"
                />


                <h1>Black Wallet</h1>

                <p><b>Status:</b> {type === "found" ? "Found" : "Lost"}</p>
                <p><b>Location:</b> Library</p>
                <p><b>Date:</b> 31 Jul 2026</p>

                <p>
                    <b>Description:</b> 
                    Black wallet found near the library area.
                </p>


                {type === "found" && (
                    <button 
                        className="claim-btn"
                        onClick={() => navigate(`/claim-item/${id}`)}
                    >
                        Claim This Item
                    </button>
                )}

            </div>

        </div>
    );
}

export default ItemDetails;