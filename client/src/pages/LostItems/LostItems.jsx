import "./LostItems.css";

import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import SearchBar from "../../components/SearchBar/SearchBar";
import ItemCard from "../../components/ItemCard/ItemCard";

import { Link, useNavigate } from "react-router-dom";

function LostItems() {

    const navigate = useNavigate();

    return (
        <div className="lost-items-page">

            <Sidebar />

            <div className="lost-items-content">

                <Navbar />

                <div className="page-header">

                    <h1 className="page-title">Lost Items</h1>

                    <Link to="/post-lost">
                        <button className="lost-post-btn">
                            + Post Lost Item
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

                    <button className="active-tab">Electronics</button>
                    <button>Books</button>
                    <button>Accessories</button>
                    <button>ID Cards</button>
                    <button>Others</button>

                </div>



                <div className="items-grid">


                    <ItemCard
                        image="https://placehold.co/300x220?text=Wallet"
                        title="Black Wallet"
                        location="Library"
                        date="27 Jul 2026"
                        status="Lost"
                        onClick={() => navigate("/item/lost/1")}
                    />


                    <ItemCard
                        image="https://placehold.co/300x220?text=ID+Card"
                        title="Student ID"
                        location="Academic Block"
                        date="26 Jul 2026"
                        status="Lost"
                        onClick={() => navigate("/item/lost/2")}
                    />


                    <ItemCard
                        image="https://placehold.co/300x220?text=Book"
                        title="Math Textbook"
                        location="Classroom"
                        date="25 Jul 2026"
                        status="Lost"
                        onClick={() => navigate("/item/lost/3")}
                    />


                    <ItemCard
                        image="https://placehold.co/300x220?text=Backpack"
                        title="Blue Backpack"
                        location="Hostel"
                        date="24 Jul 2026"
                        status="Lost"
                        onClick={() => navigate("/item/lost/4")}
                    />


                    <ItemCard
                        image="https://placehold.co/300x220?text=Power+Bank"
                        title="Power Bank"
                        location="Library"
                        date="23 Jul 2026"
                        status="Lost"
                        onClick={() => navigate("/item/lost/5")}
                    />


                    <ItemCard
                        image="https://placehold.co/300x220?text=Earbuds"
                        title="Wireless Earbuds"
                        location="Cafeteria"
                        date="22 Jul 2026"
                        status="Lost"
                        onClick={() => navigate("/item/lost/6")}
                    />


                </div>

            </div>

        </div>
    );
}

export default LostItems;