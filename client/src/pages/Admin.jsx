import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";
import "./Admin.css";

export default function Admin() {
  const [stats, setStats] = useState(null);
  const [pendingItems, setPendingItems] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const dashboard = await API.get("/admin/dashboard");
      const items = await API.get("/admin/items/pending");
      const allUsers = await API.get("/admin/users");

      setStats(dashboard.data.data);
      setPendingItems(items.data.data);
      setUsers(allUsers.data.data);
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  }

  async function moderate(id, status) {
    try {
      await API.patch(`/admin/items/${id}/moderate`, {
        approvalStatus: status,
      });

      alert("Updated");

      loadData();
    } catch (err) {
      alert(err.response?.data?.message);
    }
  }

  if (loading) return <h2>Loading...</h2>;

  return (
    <>
      <Navbar />

      <div className="adminContainer">

        <h1>Admin Dashboard</h1>

        <div className="statsGrid">

          <div className="statCard">
            <h2>{stats.pendingItems}</h2>
            <p>Pending Items</p>
          </div>

          <div className="statCard">
            <h2>{stats.pendingClaims}</h2>
            <p>Pending Claims</p>
          </div>

          <div className="statCard">
            <h2>{stats.reports}</h2>
            <p>Reports</p>
          </div>

          <div className="statCard">
            <h2>{stats.blockedUsers}</h2>
            <p>Blocked Users</p>
          </div>

        </div>

        <h2 className="sectionTitle">
          Pending Items
        </h2>

        <div className="pendingList">

          {pendingItems.map((item) => (

            <div
              className="pendingCard"
              key={item._id}
            >

              <img
                src={
                  item.photoUrl ||
                  "https://placehold.co/150x150"
                }
              />

              <div className="pendingInfo">

                <h3>{item.title}</h3>

                <p>{item.description}</p>

                <small>

                  {item.postedBy.name}

                </small>

              </div>

              <div className="buttons">

                <button
                  className="approve"
                  onClick={() =>
                    moderate(item._id, "approved")
                  }
                >
                  Approve
                </button>

                <button
                  className="reject"
                  onClick={() =>
                    moderate(item._id, "rejected")
                  }
                >
                  Reject
                </button>

              </div>

            </div>

          ))}

        </div>

        <h2 className="sectionTitle">
          Users
        </h2>

        <table>

          <thead>

            <tr>

              <th>Name</th>

              <th>Email</th>

              <th>Role</th>

              <th>Status</th>

            </tr>

          </thead>

          <tbody>

            {users.map((user) => (

              <tr key={user._id}>

                <td>{user.name}</td>

                <td>{user.email}</td>

                <td>{user.role}</td>

                <td>

                  {user.blocked ? "Blocked" : "Active"}

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>
    </>
  );
}