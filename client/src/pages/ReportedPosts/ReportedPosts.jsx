import { useState } from "react";
import "./ReportedPosts.css";
import Navbar from "../../components/Navbar/Navbar";

import {
  FaEye,
  FaTrash,
  FaFlag,
} from "react-icons/fa";

function ReportedPosts() {
  const [reportedPosts, setReportedPosts] = useState([
    {
      id: 1,
      image: "https://via.placeholder.com/70",
      item: "Wallet",
      reportedBy: "Rahul",
      reason: "Spam",
      reports: 4,
      date: "03 Aug 2026",
    },
    {
      id: 2,
      image: "https://via.placeholder.com/70",
      item: "Laptop",
      reportedBy: "Jasreet",
      reason: "Fake Claim",
      reports: 2,
      date: "02 Aug 2026",
    },
    {
      id: 3,
      image: "https://via.placeholder.com/70",
      item: "ID Card",
      reportedBy: "Vedant",
      reason: "Inappropriate Content",
      reports: 6,
      date: "01 Aug 2026",
    },
  ]);

  const handleView = (post) => {
    alert(
      `Item: ${post.item}
Reported By: ${post.reportedBy}
Reason: ${post.reason}
Reports: ${post.reports}
Date: ${post.date}`
    );
  };

  const handleRemove = (id) => {
    setReportedPosts(
      reportedPosts.filter((post) => post.id !== id)
    );
  };

  return (
    <>
      <Navbar />

      <div className="reported-posts-container">
        <div className="page-header">
          <h2>Reported Posts</h2>

          <div className="header-actions">
            <input
              type="text"
              placeholder="Search..."
              className="search-input"
            />
          </div>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Item</th>
                <th>Reported By</th>
                <th>Reason</th>
                <th>Reports</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {reportedPosts.map((post) => (
                <tr key={post.id}>
                  <td>
                    <img src={post.image} alt={post.item} />
                  </td>

                  <td>{post.item}</td>

                  <td>{post.reportedBy}</td>

                  <td>
                    <span className="reason">
                      <FaFlag />
                      {post.reason}
                    </span>
                  </td>

                  <td>{post.reports}</td>

                  <td>{post.date}</td>

                  <td>
                    <button
                      className="view-btn"
                      onClick={() => handleView(post)}
                    >
                      <FaEye />
                      View
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => handleRemove(post.id)}
                    >
                      <FaTrash />
                      Remove
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

export default ReportedPosts;