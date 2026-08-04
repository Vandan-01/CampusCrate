import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import ItemCard from "../components/ItemCard";
import "./Items.css";

export default function FoundItems() {

    const [items, setItems] = useState([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    const loadItems = async () => {

        try {

            const { data } = await API.get("/items?type=found&search=" + search);

            setItems(data.data);

        } catch (err) {

            console.log(err);

        }

        setLoading(false);

    }

    useEffect(() => {

        loadItems();

    }, []);

    return (

        <>

            <Navbar />

            <div className="itemsContainer">

                <h1>Found Items</h1>

                <input
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <button onClick={loadItems}>

                    Search

                </button>

                {loading ?

                    <h2>Loading...</h2>

                    :

                    <div className="grid">

                        {items.map(item => (

                            <ItemCard
                                key={item._id}
                                item={item}
                            />

                        ))}

                    </div>

                }

            </div>

        </>

    )

}