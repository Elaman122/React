import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import './NavBar.css';
import { useAuth } from '../context/AuthContext';

const NavBar = () => {
    const { user, logout } = useAuth();
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`/drinks?search=${searchTerm}`);
        setSearchTerm(''); // Clear search input
    };

    return (
        <div>
            <nav>
                <div className="nav-items container">
                    <div className="logo">
                        <a href="/"><h1>FakeStore.com</h1></a>
                    </div>
                    <div className="search-bar">
                        <form onSubmit={handleSearch}>
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search"
                            />
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                onClick={handleSearch}
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="icon"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </form>
                    </div>
                    <ul>
                        <li><NavLink to='/'>Home</NavLink></li>
                        <li><NavLink to='/drinks'>Products</NavLink></li>
                        <li><NavLink to='/favourites'>Favourites</NavLink></li>
                        {user ? (
                            <>
                                <li onClick={logout}><NavLink to="#">Logout</NavLink></li>
                            </>
                        ) : (
                            <li><NavLink to="/login">Login</NavLink></li>
                        )}
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default NavBar;

