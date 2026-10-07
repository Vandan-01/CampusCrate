import "./Sidebar.css";
import {
  FaHome,
  FaSearch,
  FaBoxOpen,
  FaClipboardList,
  FaComments,
  FaBell,
  FaUser,
  FaSignOutAlt,
  FaUserShield,
} from "react-icons/fa";

import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <h2 className="logo">CampusCrate</h2>

      <nav className="menu">

        <NavLink to="/dashboard" className="menu-link">
          <FaHome />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/lost-items" className="menu-link">
          <FaSearch />
          <span>Lost Items</span>
        </NavLink>

        <NavLink to="/found-items" className="menu-link">
          <FaBoxOpen />
          <span>Found Items</span>
        </NavLink>

        <NavLink to="/my-posts" className="menu-link">
          <FaClipboardList />
          <span>My Posts</span>
        </NavLink>

        <NavLink to="/messages" className="menu-link">
          <FaComments />
          <span>Messages</span>
        </NavLink>

        <NavLink to="/notifications" className="menu-link">
          <FaBell />
          <span>Notifications</span>
        </NavLink>

        <NavLink to="/profile" className="menu-link">
          <FaUser />
          <span>Profile</span>
        </NavLink>

        <NavLink to="/logout" className="menu-link">
          <FaSignOutAlt />
          <span>Logout</span>
        </NavLink>

      </nav>
    </div>
  );
}

export default Sidebar;