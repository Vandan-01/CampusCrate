import { useState } from "react";
import "./UserManagement.css";
import Navbar from "../../components/Navbar/Navbar";
import { FaUserSlash, FaTrash, FaUnlockAlt } from "react-icons/fa";

function UserManagement() {
  const [search, setSearch] = useState("");

  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Rahul Sharma",
      email: "rahul@iitjammu.ac.in",
      role: "Student",
      status: "Active",
    },
    {
      id: 2,
      name: "Jasreet",
      email: "jasreet@iitjammu.ac.in",
      role: "Student",
      status: "Blocked",
    },
    {
      id: 3,
      name: "Admin",
      email: "admin@campuscrate.com",
      role: "Admin",
      status: "Active",
    },
  ]);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleBlock = (id) => {
    setUsers(
      users.map((user) =>
        user.id === id
          ? { ...user, status: "Blocked" }
          : user
      )
    );
  };

  const handleUnblock = (id) => {
    setUsers(
      users.map((user) =>
        user.id === id
          ? { ...user, status: "Active" }
          : user
      )
    );
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (confirmDelete) {
      setUsers(users.filter((user) => user.id !== id));
    }
  };

  return (
    <div className="users-container">
      <Navbar />

      <div className="page-header">
        <h2>User Management</h2>

        <div className="header-actions">
          <input
            type="text"
            placeholder="Search users..."
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
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>

                <td>{user.email}</td>

                <td>
                  <span
                    className={
                      user.role === "Admin"
                        ? "role admin"
                        : "role student"
                    }
                  >
                    {user.role}
                  </span>
                </td>

                <td>
                  <span
                    className={
                      user.status === "Active"
                        ? "active-status"
                        : "blocked-status"
                    }
                  >
                    {user.status}
                  </span>
                </td>

                <td>
                  <div className="actions">
                    {user.status === "Active" ? (
                      <button
                        className="block-btn"
                        onClick={() => handleBlock(user.id)}
                      >
                        <FaUserSlash />
                        Block
                      </button>
                    ) : (
                      <button
                        className="unblock-btn"
                        onClick={() => handleUnblock(user.id)}
                      >
                        <FaUnlockAlt />
                        Unblock
                      </button>
                    )}

                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(user.id)}
                    >
                      <FaTrash />
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}

export default UserManagement;