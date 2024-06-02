import React, { useEffect, useState } from 'react';
import './header.css';
import { Nav, NavLink, Bars } from '../Navbar/navbarElements';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../reducers/authReducer';
import dd from '../../assets/dropdown.webp';

const Header = () => {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleLogout = () => {
        dispatch(logout());
    };

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/", { replace: true });
        }
    }, [isLoggedIn]);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <Nav>
            <Bars />
            {!isLoggedIn && <NavLink to="/" className="nav-item">Home</NavLink>}
            {!isLoggedIn && <NavLink to="/login" className="nav-item">Log In</NavLink>}
            {!isLoggedIn && <NavLink to="/signup" className="nav-item">Sign Up</NavLink>}
            {isLoggedIn && (
                <>
                    <NavLink to="/chatmain" className="nav-item">Chat</NavLink>
                    <NavLink to="/analytics" className="nav-item">Analytics</NavLink>
                    <div className="user-controls">
                        <div className="user-dropdown" onClick={toggleDropdown}>
                            <span>Hello, {user?.name}</span>
                            <img src={dd} alt="Dropdown arrow" className="dropdown-arrow" />
                            <div className={`dropdown-content ${dropdownOpen ? 'show' : ''}`}>
                                <button onClick={handleLogout} className="dropdown-item">Logout</button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </Nav>
    );
};

export default Header;