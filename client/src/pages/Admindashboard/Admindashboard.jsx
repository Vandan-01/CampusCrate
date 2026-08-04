import "./AdminDashboard.css";
import Navbar from "../../components/Navbar/Navbar";

import {
  FaUsers,
  FaSearch,
  FaBoxOpen,
  FaClipboardCheck,
  FaArrowRight,
} from "react-icons/fa";

function AdminDashboard() {
  const recentClaims = [
    {
      id: 1,
      user: "Vedant Sharma",
      item: "Black Wallet",
      status: "Pending",
    },
    {
      id: 2,
      user: "Jasreet Kaur",
      item: "Student ID Card",
      status: "Approved",
    },
    {
      id: 3,
      user: "Vandan Chouhan",
      item: "Blue Backpack",
      status: "Pending",
    },
  ];

  return (
    <>
      <Navbar />

      <div className="admin-dashboard-container">
        <div className="page-header">
          <h1 className="page-title">Admin Dashboard</h1>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <FaUsers className="stat-icon" />
            <h2>248</h2>
            <p>Total Users</p>
          </div>

          <div className="stat-card">
            <FaSearch className="stat-icon" />
            <h2>54</h2>
            <p>Lost Items</p>
          </div>

          <div className="stat-card">
            <FaBoxOpen className="stat-icon" />
            <h2>69</h2>
            <p>Found Items</p>
          </div>

          <div className="stat-card">
            <FaClipboardCheck className="stat-icon" />
            <h2>12</h2>
            <p>Pending Claims</p>
          </div>
        </div>

        <div className="claims-section">
          <div className="section-header">
            <h2>Recent Claims</h2>

            <button>
              View All <FaArrowRight />
            </button>
          </div>

          <table>
            <thead>
              <tr>
                <th>User</th>
                <th>Item</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {recentClaims.map((claim) => (
                <tr key={claim.id}>
                  <td>{claim.user}</td>
                  <td>{claim.item}</td>
                  <td>
                    <span
                      className={
                        claim.status === "Approved"
                          ? "approved"
                          : "pending"
                      }
                    >
                      {claim.status}
                    </span>
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

export default AdminDashboard;