import { useState } from "react";
import "./PendingClaims.css";
import Navbar from "../../components/Navbar/Navbar";
import { FaCheck, FaTimes } from "react-icons/fa";

function PendingClaims() {
  const [search, setSearch] = useState("");

  const [claims, setClaims] = useState([
    {
      id: 1,
      image: "https://via.placeholder.com/70",
      item: "iPhone 15",
      claimant: "Rahul",
      owner: "Aman",
      date: "03 Aug 2026",
      status: "Pending",
    },
    {
      id: 2,
      image: "https://via.placeholder.com/70",
      item: "Blue Bag",
      claimant: "Jasreet",
      owner: "Neha",
      date: "02 Aug 2026",
      status: "Pending",
    },
    {
      id: 3,
      image: "https://via.placeholder.com/70",
      item: "ID Card",
      claimant: "Vedant",
      owner: "Riya",
      date: "01 Aug 2026",
      status: "Pending",
    },
  ]);

  const filteredClaims = claims.filter(
    (claim) =>
      claim.item.toLowerCase().includes(search.toLowerCase()) ||
      claim.claimant.toLowerCase().includes(search.toLowerCase()) ||
      claim.owner.toLowerCase().includes(search.toLowerCase())
  );

  const handleApprove = (id) => {
    setClaims(
      claims.map((claim) =>
        claim.id === id
          ? { ...claim, status: "Approved" }
          : claim
      )
    );
  };

  const handleReject = (id) => {
    setClaims(
      claims.map((claim) =>
        claim.id === id
          ? { ...claim, status: "Rejected" }
          : claim
      )
    );
  };

  return (
    <>
      <Navbar />

      <div className="pending-claims-container">
        <div className="page-header">
          <h2>Pending Claims</h2>

          <div className="header-actions">
            <input
              type="text"
              placeholder="Search..."
              className="search-input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Item</th>
                <th>Claimed By</th>
                <th>Original Poster</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredClaims.map((claim) => (
                <tr key={claim.id}>
                  <td>
                    <img src={claim.image} alt={claim.item} />
                  </td>

                  <td>{claim.item}</td>

                  <td>{claim.claimant}</td>

                  <td>{claim.owner}</td>

                  <td>{claim.date}</td>

                  <td>{claim.status}</td>

                  <td>
                    <button
                      className="approve-btn"
                      onClick={() => handleApprove(claim.id)}
                    >
                      <FaCheck /> Approve
                    </button>

                    <button
                      className="reject-btn"
                      onClick={() => handleReject(claim.id)}
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

export default PendingClaims;