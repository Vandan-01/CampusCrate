import { Link, NavLink, useNavigate } from "react-router-dom";
import { HiArrowRightOnRectangle, HiBars3, HiMagnifyingGlass, HiPlus, HiXMark } from "react-icons/hi2";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

export default function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const links = [
        { name: "Discover", path: "/", end: true },
        { name: "Lost", path: "/lost" },
        { name: "Found", path: "/found" },
        { name: "My activity", path: "/myposts" },
        { name: "Claims", path: "/claims" },
    ];
    if (user?.role === "admin") links.push({ name: "Moderation", path: "/admin" });

    function handleLogout() {
        logout();
        navigate("/login", { replace: true });
    }

    function closeMenu() {
        setIsMenuOpen(false);
    }

    return (
        <header className="site-header">
        <nav className="site-nav" aria-label="Main navigation">
            <Link className="wordmark" to="/" aria-label="CampusCrate home">
                Campus<span>Crate</span><i aria-hidden="true" />
            </Link>
            <div id="main-navigation-links" className={`site-nav__links${isMenuOpen ? " site-nav__links--open" : ""}`}>
                {links.map((link) => (
                    <NavLink
                        key={link.path}
                        to={link.path}
                        end={link.end}
                        onClick={closeMenu}
                    >
                        {link.name}
                    </NavLink>
                ))}
            </div>
            <div className="site-nav__actions">
                <Link className="nav-search" to="/lost" aria-label="Search item listings"><HiMagnifyingGlass /></Link>
                <Link className="nav-post button button-primary" to="/post-lost"><HiPlus /> Report an item </Link>
                <button className="nav-logout" type="button" onClick={handleLogout} aria-label="Sign out"><HiArrowRightOnRectangle /><span>Sign out</span></button>
                <button
                    className="nav-menu-toggle"
                    type="button"
                    aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                    aria-expanded={isMenuOpen}
                    aria-controls="main-navigation-links"
                    onClick={() => setIsMenuOpen((open) => !open)}
                >
                    {isMenuOpen ? <HiXMark /> : <HiBars3 />}
                </button>
            </div>
        </nav>
        </header>
    );
}
