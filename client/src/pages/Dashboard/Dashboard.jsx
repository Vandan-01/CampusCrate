import "./Dashboard.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";

import { useNavigate } from "react-router-dom";

function Dashboard() {

  const navigate = useNavigate();

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="dashboard-content">
        <Navbar />

        <div className="welcome">
          <h2>Hello, Jasreet </h2>
          <p>Welcome back! Here's your campus activity.</p>
        </div>

        <div className="stats">
          <div className="stat-card">
            <h2>12</h2>
            <p>Lost Reports</p>
          </div>

          <div className="stat-card">
            <h2>8</h2>
            <p>Found Reports</p>
          </div>

          <div className="stat-card">
            <h2>3</h2>
            <p>Active Claims</p>
          </div>

          <div className="stat-card">
            <h2>2</h2>
            <p>Items Returned</p>
          </div>
        </div>

        <div className="bottom-section">
          <div className="recent-activity">
            <h3>Recent Activity</h3>

            <div className="activity-item">
              <p>Wallet reported lost</p>
              <span>10 mins ago</span>
            </div>

            <div className="activity-item">
              <p>Phone found near Library</p>
              <span>30 mins ago</span>
            </div>

            <div className="activity-item">
              <p>Claim approved</p>
              <span>1 hour ago</span>
            </div>

            <div className="activity-item">
              <p>Student collected Laptop</p>
              <span>Today</span>
            </div>
          </div>

          <div className="quick-actions">
            <h3>Quick Actions</h3>
            <button onClick={() => navigate("/post-lost")}>
              Report Lost Item
            </button>

            <button onClick={() => navigate("/post-found")}>
              Report Found Item
            </button>

            <button onClick={() => navigate("/lost-items")}>
              Browse Lost Items
            </button>

            <button onClick={() => navigate("/found-items")}>
              Browse Found Items
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;