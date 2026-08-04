import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";
import "./ItemDetails.css";

export default function ItemDetails() {

    const { id } = useParams();

    const [item, setItem] = useState(null);
    const [matches, setMatches] = useState([]);
    const [message, setMessage] = useState("");
    const [answer, setAnswer] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadItem();

    }, []);

    const loadItem = async () => {

        try {

            const res = await API.get(`/items/${id}`);

            setItem(res.data.data);

            const match = await API.get(`/items/${id}/matches`);

            setMatches(match.data.data);

        } catch (err) {

            console.log(err);

        }

        setLoading(false);

    }

    const claimItem = async () => {

        try {

            await API.post("/claims", {

                itemId: item._id,

                message,

                answer

            });

            alert("Claim Submitted");

        } catch (err) {

            alert(err.response?.data?.message);

        }

    }

    async function reportItem() {

        try {

            await API.post("/reports", {

                itemId: item._id,

                reason: "Spam"

            });

            alert("Report submitted");

        } catch (err) {

            alert(err.response?.data?.message);

        }

    }

    const markReturned = async () => {

        try {

            await API.patch(`/items/${item._id}/returned`);

            alert("Marked Returned");

            loadItem();

        } catch (err) {

            alert(err.response?.data?.message);

        }

    }

    if (loading) {

        return <h1>Loading...</h1>

    }

    return (

        <>

            <Navbar />

            <div className="details">

                <div className="left">

                    <img
                        src={
                            item.photoUrl ||
                            "https://placehold.co/600x450"
                        }
                    />

                </div>

                <div className="right">

                    <h1>

                        {item.title}

                    </h1>

                    <p>

                        {item.description}

                    </p>

                    <div className="info">

                        <p>

                            <b>Category:</b> {item.category}

                        </p>

                        <p>

                            <b>Location:</b> {item.location}

                        </p>

                        <p>

                            <b>Status:</b> {item.status}

                        </p>

                        <p>

                            <b>Posted By:</b> {item.postedBy.name}

                        </p>

                    </div>

                    <textarea
                        placeholder="Message for owner"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />


                    <textarea
                        placeholder="Answer to claim question"
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                    />
                    <button
                        onClick={claimItem}
                    >

                        Claim Item

                    </button>

                    <button
                        className="reportBtn"
                        onClick={reportItem}
                    >

                        Report Abuse

                    </button>

                    {item.status === "claimed" &&

                        <button
                            className="returnBtn"
                            onClick={markReturned}
                        >

                            Mark Returned

                        </button>

                    }

                </div>

            </div>

            <div className="matches">

                <h2>

                    Possible Matches

                </h2>

                <div className="matchGrid">

                    {matches.map(match => (

                        <div
                            className="matchCard"
                            key={match._id}
                        >

                            <img src={match.photoUrl} />

                            <h3>

                                {match.title}

                            </h3>

                            <p>

                                {match.location}

                            </p>

                        </div>

                    ))}

                </div>

            </div>

        </>

    )

}