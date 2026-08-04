import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
    const location = useLocation();

    const links = [
        { name: "Dashboard", path: "/" },
        { name: "Lost Items", path: "/lost" },
        { name: "Found Items", path: "/found" },
        { name: "Post Lost", path: "/post-lost" },
        { name: "Post Found", path: "/post-found" },
        { name: "My Posts", path: "/myposts" },
        { name: "Admin", path: "/admin" },
        {
            name: "Claims",
            path: "/claims"
        },
    ];

    return (
        <nav className="navbar">
            <div className="logo">
                Campus<span>Crate</span>
            </div>

            <div className="navLinks">
                {links.map((link) => (
                    <Link
                        key={link.path}
                        to={link.path}
                        className={
                            location.pathname === link.path ? "activeLink" : ""
                        }
                    >
                        {link.name}
                    </Link>
                ))}
            </div>

            <button

className="logoutBtn"

onClick={()=>{

localStorage.removeItem("token");

window.location.href="/login";

}}

>

Logout

</button>
        </nav>
    );
}