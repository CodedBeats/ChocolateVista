// dependencies
import { useContext } from "react";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import Image from 'react-bootstrap/Image';
import { Link, useNavigate } from "react-router-dom";

// components
import UserContext from '../../UserContext';
import Search from "../common/Search";

// style
import "./css/navbar.css";


const NavbarComponent = () => {
    const navigate = useNavigate();
    const {userData, setUserData} = useContext(UserContext);

    const handleLogout = () => {
        setUserData({
            userID: "",
            imgUrl: "",
            email: "",
            username: "",
            isLoggedIn: false,
        });
        navigate("/");
    }

    return (
        <Navbar expand="lg" className="navbar-container">
            <Link to="/" className="logo-img-link">
                <Image 
                    className="logo-img"
                    src="/imgs/logo.png"
                    width="50"
                    height="50"
                    alt="Logo"
                    rounded 
                />
                <span className="logo-title">ChocolateVista</span>
            </Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="nav-right">
                <Nav className="mr-auto">
                    <Search />
                </Nav>
                <Nav>
                    <Link to="/chocolates" className="nav-link">
                        Chocolates
                    </Link>
                    <Link to="/about" className="nav-link">
                        About
                    </Link>
                </Nav>
                <Nav>
                    {userData.isLoggedIn ? (
                        <div>
                        <Link to="/profile">
                            <Button variant="dark">Profile</Button>
                        </Link>
                        <Button variant="danger" className="logout-btn" onClick={handleLogout}>Logout</Button>
                        </div>
                    ) : (
                        <Link to="/register">
                            <Button variant="dark">Register</Button>
                        </Link>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavbarComponent;
