import { useState } from "react";
import "./PendingPosts.css";
import Navbar from "../../components/Navbar/Navbar";
import { FaCheck, FaTimes } from "react-icons/fa";

function PendingPosts() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const [pendingPosts, setPendingPosts] = useState([
    {
      id: 1,
      image: "https://via.placeholder.com/70",
      item: "iPhone 15",
      user: "Rahul",
      type: "Lost",
      date: "03 Aug 2026",
      status: "Pending",
    },
    {
      id: 2,
      image: "https://via.placeholder.com/70",
      item: "Blue Bag",
      user: "Jasreet",
      type: "Found",
      date: "02 Aug 2026",
      status: "Pending",
    },
    {
      id: 3,
      image: "https://via.placeholder.com/70",
      item: "ID Card",
      user: "Vedant",
      type: "Lost",
      date: "01 Aug 2026",
      status: "Pending",
    },
  ]);

  const filteredPosts = pendingPosts.filter((post) => {
    const matchesSearch =
      post.item.toLowerCase().includes(search.toLowerCase()) ||
      post.user.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "All" || post.type === filter;

    return matchesSearch && matchesFilter;
  });

  const handleApprove = (id) => {
    setPendingPosts(
      pendingPosts.map((post) =>
        post.id === id
          ? { ...post, status: "Approved" }
          : post
      )
    );
  };

  const handleReject = (id) => {
    setPendingPosts(
      pendingPosts.map((post) =>
        post.id === id
          ? { ...post, status: "Rejected" }
          : post
      )
    );
  };

  return (
    <>
      <Navbar />

      <div className="pending-posts-container">
        <div className="page-header">
          <h2>Pending Posts</h2>

          <div className="header-actions">
            <input
              type="text"
              placeholder="Search..."
              className="search-input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              className="filter-select"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option>All</option>
              <option>Lost</option>
              <option>Found</option>
            </select>
          </div>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Item</th>
                <th>Posted By</th>
                <th>Type</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredPosts.map((post) => (
                <tr key={post.id}>
                  <td>
                    <img src={post.image} alt={post.item} />
                  </td>

                  <td>{post.item}</td>

                  <td>{post.user}</td>

                  <td>
                    <span
                      className={
                        post.type === "Lost"
                          ? "status lost"
                          : "status found"
                      }
                    >
                      {post.type}
                    </span>
                  </td>

                  <td>{post.date}</td>

                  <td>{post.status}</td>

                  <td>
                    <button
                      className="approve-btn"
                      onClick={() => handleApprove(post.id)}
                    >
                      <FaCheck /> Approve
                    </button>

                    <button
                      className="reject-btn"
                      onClick={() => handleReject(post.id)}
                    >
                      <FaTimes /> Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>
    </>
  );
}

export default PendingPosts;