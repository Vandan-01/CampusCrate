import "./Messages.css";

import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";

import {
    FaSearch,
    FaPaperPlane,
    FaCircle,
} from "react-icons/fa";

function Messages() {

    const chats = [

        {
            id: 1,
            name: "Rahul Sharma",
            item: "Black Wallet",
            active: true,
        },

        {
            id: 2,
            name: "Ananya Verma",
            item: "ID Card",
        },

        {
            id: 3,
            name: "Karan Mehta",
            item: "Blue Backpack",
        },

        {
            id: 4,
            name: "Priya Singh",
            item: "Math Book",
        },

    ];

    return (

        <div className="messages-page">

            <Sidebar />

            <div className="messages-content">

                <Navbar />

                <h1 className="page-title">
                    Messages
                </h1>

                <div className="chat-container">

                    <div className="chat-sidebar">

                        <div className="chat-search">

                            <FaSearch />

                            <input
                                type="text"
                                placeholder="Search chats..."
                            />

                        </div>

                        {chats.map(chat => (

                            <div
                                key={chat.id}
                                className={`chat-user ${chat.active ? "active-chat" : ""}`}
                            >

                                <div className="avatar">

                                    {chat.name.charAt(0)}

                                </div>

                                <div>

                                    <h4>{chat.name}</h4>

                                    <p>{chat.item}</p>

                                </div>
                            </div>

                        ))}

                    </div>

                    <div className="chat-window">

                        <div className="chat-header">

                            <div className="avatar large">
                                R
                            </div>

                            <div>

                                <h3>Rahul Sharma</h3>

                                <p>
                                    <FaCircle className="online-dot" />
                                    Active now
                                </p>

                            </div>
                        </div>

                        <div className="chat-messages">

                            <div className="message received">

                                Hi! Is this your wallet?

                            </div>

                            <div className="message sent">

                                Yes, I think so.

                            </div>

                            <div className="message received">

                                Can you tell me what's inside it?

                            </div>

                            <div className="message sent">

                                It has my college ID and ATM card.

                            </div>
                        </div>

                        <div className="message-input">

                            <input
                                type="text"
                                placeholder="Type a message..."
                            />

                            <button>
                                <FaPaperPlane />
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default Messages;