// dependencies
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';

// components
import UserContext from '../../UserContext';
import UpdateUserInfo from './UpdateUserInfo';
import CustomToast from "../common/CustomToast";

// style
import "./css/user-info.css";


let UserInfo = () => {
    const navigate = useNavigate();
    const {userData: user, setUserData} = useContext(UserContext);
    const [modalShow, setModalShow] = useState(false);

    const handleDelete = () => {
        // Prompt the user with a confirmation dialog
        const isConfirmed = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");

        // If the user confirms, proceed with the deletion
        if (isConfirmed) {
            fetch("http://localhost/chocolatevista_api/auth/deleteUser.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userID: user.userID })
            })
            .then(response => response.json())
            .then(data => {
                console.log(data.message);

                // essentially logout
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

                // notify user successfully deleted account
                CustomToast("Account Deleted Successfully", "success");
            })
            .catch(error => {
                console.error("Error:", error);
            });
    }}

    
    return (
        <div className="user-info">
            <div className="user-img-container">
                <Image src={user.imgUrl} alt="Logo" className="user-img" rounded />
            </div>
            <div className="email-container">
                <p className="user-info-label">Email</p>
                <p className="user-info-text">{user.email}</p>
            </div>
            <div className="username-container">
                <p className="user-info-label">Username</p>
                <p className="user-info-text">{user.username}</p>
            </div>
            <div className="user-info-btns">
                <Button variant="warning" onClick={() => setModalShow(true)} className="user-info-btn">Update Details</Button>
                <Button variant="danger" onClick={handleDelete} className="user-info-btn">Delete Account</Button>
            </div>
            <UpdateUserInfo
                show={modalShow}
                onHide={() => setModalShow(false)}
                email={user.email}
            />
        </div>
    )
}

export default UserInfo;
