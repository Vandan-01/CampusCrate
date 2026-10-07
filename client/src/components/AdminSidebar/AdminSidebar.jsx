import "./AdminSidebar.css";

import {
  FaHome,
  FaClipboardList,
  FaClipboardCheck,
  FaFlag,
  FaUsers,
  FaChartBar,
  FaSignOutAlt,
} from "react-icons/fa";

import { NavLink } from "react-router-dom";


function AdminSidebar() {


  const activeClass = ({ isActive }) =>
    isActive ? "admin-link active" : "admin-link";


  return (

    <div className="admin-sidebar">


      <div className="admin-logo">

        <h2>CampusCrate</h2>

        <p>Admin Panel</p>

      </div>



      <nav className="admin-menu">


        <NavLink
          to="/admin"
          end
          className={activeClass}
        >

          <FaHome />

          <span>
            Dashboard
          </span>

        </NavLink>




        <NavLink
          to="/admin/pending-posts"
          className={activeClass}
        >

          <FaClipboardList />

          <span>
            Pending Posts
          </span>

        </NavLink>





        <NavLink
          to="/admin/pending-claims"
          className={activeClass}
        >

          <FaClipboardCheck />

          <span>
            Pending Claims
          </span>

        </NavLink>





        <NavLink
          to="/admin/reported-posts"
          className={activeClass}
        >

          <FaFlag />

          <span>
            Reported Posts
          </span>

        </NavLink>





        <NavLink
          to="/admin/users"
          className={activeClass}
        >

          <FaUsers />

          <span>
            User Management
          </span>

        </NavLink>





        <NavLink
          to="/admin/analytics"
          className={activeClass}
        >

          <FaChartBar />

          <span>
            Analytics
          </span>

        </NavLink>





        <NavLink
          to="/logout"
          className={({isActive}) =>
            isActive 
            ? "admin-link active logout-link" 
            : "admin-link logout-link"
          }
        >

          <FaSignOutAlt />

          <span>
            Logout
          </span>

        </NavLink>



      </nav>


    </div>

  );

}


export default AdminSidebar;