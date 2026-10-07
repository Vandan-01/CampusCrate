import "./Logout.css";

import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";

import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Logout() {

    const navigate = useNavigate();

    const handleLogout = () => {

        navigate("/login");

    };

    return (

        <div className="logout-page">

            <Sidebar />

            <div className="logout-content">

                <Navbar />

                <div className="logout-container">

                    <div className="logout-card">

                        <FaSignOutAlt className="logout-icon" />

                        <h2>Logout</h2>

                        <p>
                            Are you sure you want to logout from
                            <br />
                            CampusCrate?
                        </p>

                        <div className="logout-buttons">

                            <button
                                className="cancel-btn"
                                onClick={() => navigate(-1)}
                            >
                                Cancel
                            </button>

                            <button
                                className="logout-btn"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default Logout;