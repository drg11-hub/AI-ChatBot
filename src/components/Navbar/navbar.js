import React from "react";
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink,
} from "./navbarElements";

const Navbar = () => {
    return (
        <>
            <Nav>
                <Bars />
                <NavMenu>
                </NavMenu>
                <NavBtn>
                    <NavBtnLink to="/">Home</NavBtnLink>
                    <NavBtnLink to="/login">Log In</NavBtnLink>
                    <NavBtnLink to="/signup">Sign Up</NavBtnLink>
                </NavBtn>
            </Nav>
        </>
    );
};

export default Navbar;