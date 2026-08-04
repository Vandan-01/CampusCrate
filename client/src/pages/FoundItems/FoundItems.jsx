import "./FoundItems.css";

import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import SearchBar from "../../components/SearchBar/SearchBar";
import ItemCard from "../../components/ItemCard/ItemCard";

import { Link, useNavigate } from "react-router-dom";

function FoundItems() {

    const navigate = useNavigate();

    return (
        <div className="lost-items-page">
            <Sidebar />

            <div className="lost-items-content">
                <Navbar />


                <div className="page-header">

                    <h1 className="page-title">
                        Found Items
                    </h1>

                    <Link to="/post-found">

                        <button className="found-post-btn">
                            + Post Found Item
                        </button>

                    </Link>

                </div>

                <SearchBar />

                <div className="top-controls">
                    <select className="category-select">
                        <option>All Categories</option>
                        <option>Electronics</option>
                        <option>Books</option>
                        <option>Accessories</option>
                        <option>ID Cards</option>
                        <option>Others</option>
                    </select>

                    <select className="sort-select">
                        <option>Newest</option>
                        <option>Oldest</option>
                        <option>A-Z</option>
                        <option>Z-A</option>
                    </select>
                </div>

                <div className="category-tabs">
                    <button>Electronics</button>
                    <button>Books</button>
                    <button className="active-tab">Accessories</button>
                    <button>ID Cards</button>
                    <button>Others</button>
                </div>

                <div className="items-grid">

                    <ItemCard
                        image="https://placehold.co/300x220?text=Wallet"
                        title="Black Wallet"
                        location="Library"
                        date="31 Jul 2026"
                        status="Found"
                        onClick={() => navigate("/item/found/1")}
                        onClaim={() => navigate("/claim-item/1")}
                    />

                    <ItemCard
                        image="https://placehold.co/300x220?text=ID+Card"
                        title="Student ID Card"
                        location="Academic Block"
                        date="31 Jul 2026"
                        status="Found"
                        onClick={() => navigate("/item/found/2")}
                        onClaim={() => navigate("/claim-item/2")}
                    />

                    <ItemCard
                        image="https://placehold.co/300x220?text=Bottle"
                        title="Water Bottle"
                        location="Sports Complex"
                        date="30 Jul 2026"
                        status="Found"
                        onClick={() => navigate("/item/found/3")}
                        onClaim={() => navigate("/claim-item/3")}
                    />

                    <ItemCard
                        image="https://placehold.co/300x220?text=Notebook"
                        title="Notebook"
                        location="Room C-204"
                        date="29 Jul 2026"
                        status="Found"
                        onClick={() => navigate("/item/found/4")}
                        onClaim={() => navigate("/claim-item/4")}
                    />

                    <ItemCard
                        image="https://placehold.co/300x220?text=Keys"
                        title="Key Chain"
                        location="Parking Area"
                        date="28 Jul 2026"
                        status="Found"
                        onClick={() => navigate("/item/found/5")}
                        onClaim={() => navigate("/claim-item/5")}
                    />

                    <ItemCard
                        image="https://placehold.co/300x220?text=Earphones"
                        title="Wireless Earphones"
                        location="Cafeteria"
                        date="28 Jul 2026"
                        status="Found"
                        onClick={() => navigate("/item/found/5")}
                        onClaim={() => navigate("/claim-item/5")}
                    />

                </div>

            </div>
        </div>
    );
}

export default FoundItems;