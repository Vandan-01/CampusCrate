import "./Notifications.css";

import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";

import { useNavigate } from "react-router-dom";

import {
    FaBell,
    FaCheckCircle,
    FaComments,
    FaBoxOpen,
    FaArrowRight,
} from "react-icons/fa";

function Notifications() {

    const navigate = useNavigate();

    const notifications = [

        {
            id: 1,
            icon: <FaBell />,
            title: "New Match Found",
            message: "A found item matches your lost Black Wallet.",
            time: "2 minutes ago",
            button: "View Item",
            path: "/item/found/1",
            color: "blue"
        },

        {
            id: 2,
            icon: <FaCheckCircle />,
            title: "Claim Approved",
            message: "Your claim for the Blue Backpack has been approved.",
            time: "1 hour ago",
            button: "View Claim",
            path: "/claim-item/2",
            color: "green"
        },

        {
            id: 3,
            icon: <FaComments />,
            title: "New Message",
            message: "Rahul Sharma sent you a new message regarding your lost item.",
            time: "Yesterday",
            button: "Open Chat",
            path: "/messages",
            color: "orange"
        },

        {
            id: 4,
            icon: <FaBoxOpen />,
            title: "Item Returned",
            message: "Your Student ID Card has been marked as returned.",
            time: "2 days ago",
            button: "View Details",
            path: "/item/found/4",
            color: "purple"
        }

    ];

    return (

        <div className="notifications-page">
            <Sidebar />
            <div className="notifications-content">
                <Navbar />
                <div className="page-header">

                    <h1 className="page-title">
                        Notifications
                    </h1>

                </div>

                <div className="notifications-list">

                    {notifications.map((notification) => (

                        <div
                            className="notification-card"
                            key={notification.id}
                        >

                            <div className="notification-left">

                                <div className={`notification-icon ${notification.color}`}>

                                    {notification.icon}

                                </div>

                                <div className="notification-info">

                                    <h3>{notification.title}</h3>

                                    <p>{notification.message}</p>

                                    <span>{notification.time}</span>

                                </div>
                            </div>

                            <button
                                className="notification-btn"
                                onClick={() => navigate(notification.path)}
                            >

                                {notification.button}

                                <FaArrowRight />

                            </button>

                        </div>

                    ))}

                </div>
            </div>
        </div>

    );

}

export default Notifications;