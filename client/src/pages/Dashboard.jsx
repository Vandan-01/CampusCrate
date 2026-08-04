import Navbar from "../components/Navbar.jsx";
import "./Dashboard.css";

export default function Dashboard() {
  return (
    <>
      <Navbar />

      <div className="dashboard">

        <div className="hero">

          <h1>Campus Lost & Found</h1>

          <p>
            Report lost items, upload found belongings and
            help students reconnect with their valuables.
          </p>

        </div>

        <div className="stats">

          <div className="card">
            <h2>24</h2>
            <p>Lost Items</p>
          </div>

          <div className="card">
            <h2>41</h2>
            <p>Found Items</p>
          </div>

          <div className="card">
            <h2>17</h2>
            <p>Returned</p>
          </div>

        </div>

        <div className="actions">

          <a href="/post-lost">
            <div className="actionCard">
              <h3>Report Lost Item</h3>
              <p>Create a lost item report.</p>
            </div>
          </a>

          <a href="/post-found">
            <div className="actionCard">
              <h3>Report Found Item</h3>
              <p>Upload details of a found item.</p>
            </div>
          </a>

          <a href="/lost">
            <div className="actionCard">
              <h3>Browse Lost</h3>
              <p>See recently lost items.</p>
            </div>
          </a>

          <a href="/found">
            <div className="actionCard">
              <h3>Browse Found</h3>
              <p>See recently found items.</p>
            </div>
          </a>

        </div>

      </div>
    </>
  );
}