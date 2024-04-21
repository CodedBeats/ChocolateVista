// dependencies
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Button } from "react-bootstrap";
import Image from 'react-bootstrap/Image';
import Dropdown from 'react-bootstrap/Dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';

// components
import UserContext from '../../UserContext';
import Search from "../common/Search";
import CustomToast from "../common/CustomToast";

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
        // clear user data from local storage
        localStorage.removeItem("userData");
        navigate("/");

        // notify user logout success
        CustomToast("Logout Successful", "success");
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
            <Nav className="mr-auto navbar-search-container">
                <Search />
            </Nav>
            <Navbar.Collapse id="basic-navbar-nav" className="nav-right">
                <Nav className="sidebar">
                    <Nav className="mr-auto sidebar-search">
                        <Search />
                    </Nav>
                    <Link to="/chocolates" className="nav-link">
                        Chocolates
                    </Link>
                    <Link to="/about" className="nav-link">
                        About
                    </Link>
                </Nav>
            </Navbar.Collapse>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Nav>
                {userData.isLoggedIn ? (
                <Dropdown align={{ lg: "end" }} className="navbar-dropdown">
                    <Dropdown.Toggle variant="transparent" id="dropdown-basic" className="nav-dropdown-btn">
                        <Image 
                            className="logo-img"
                            src={userData.imgUrl}
                            width="50"
                            height="50"
                            alt="Logo"
                            rounded 
                        />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.ItemText>
                            <div className="navbar-user-info">
                                {userData.username}
                            </div>
                        </Dropdown.ItemText>
                        <Dropdown.Divider />
                        <Dropdown.Item>
                            <Link to="/profile" className="navbar-dropdown-link">
                                <FontAwesomeIcon icon={faUser} />
                                <span className="navbar-dropdown-link-text">Profile</span>
                            </Link>
                        </Dropdown.Item>
                        <Dropdown.Item onClick={handleLogout}>
                            <FontAwesomeIcon icon={faRightFromBracket} />
                            <span className="navbar-dropdown-link-text">Logout</span>
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                ) : (
                    <Link to="/login">
                        <Button variant="dark">Login</Button>
                    </Link>
                )}
            </Nav>
        </Navbar>
    );
};

export default NavbarComponent;
