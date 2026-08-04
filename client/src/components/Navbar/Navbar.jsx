import "./Navbar.css";
import { FaBell, FaUserCircle } from "react-icons/fa";

function Navbar() {
  return (
    <div className="navbar">
      <div className="navbar-right">
        <FaBell className="icon" />
        <FaUserCircle className="profile-icon" />
      </div>
    </div>
  );
}

export default Navbar;