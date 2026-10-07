import "./MyPosts.css";

import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";

import { useNavigate } from "react-router-dom";

function MyPosts() {

    const navigate = useNavigate();

    const posts = [
        {
            id: 1,
            title: "Black Wallet",
            type: "Found",
            location: "Library",
            date: "31 Jul 2026",
            status: "Active"
        },
        {
            id: 2,
            title: "Student ID Card",
            type: "Lost",
            location: "Academic Block",
            date: "26 Jul 2026",
            status: "Active"
        }
    ];

    return (
        <div className="my-posts-page">

            <Sidebar />

            <div className="my-posts-content">

                <Navbar />

                <div className="page-header">
                    <h1>My Posts</h1>
                </div>

                <div className="posts-grid">

                    {posts.map((post) => (

                        <div className="post-card" key={post.id}>

                            <h2>{post.title}</h2>

                            <p>
                                <b>Type:</b> {post.type}
                            </p>

                            <p>
                                <b>Location:</b> {post.location}
                            </p>

                            <p>
                                <b>Date:</b> {post.date}
                            </p>

                            <span className="post-status">
                                {post.status}
                            </span>

                            <button
                                onClick={() => navigate(`/item/${post.type.toLowerCase()}/${post.id}`)}
                            >
                                View Details
                            </button>

                        </div>

                    ))}

                </div>
            </div>
        </div>
    );
}

export default MyPosts;