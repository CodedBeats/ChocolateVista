// dependencies
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

// components
import UserContext from '../../UserContext';

// style
import "./css/modal.css";

let UpdateUserInfo = (props) => {
    const {userData, setUserData} = useContext(UserContext);

    const [formData, setFormData] = useState({
        email: "",
        username: "",
        password: "",
        confirmedPassword: "",
    });
    const [usernameIsLocked, setUsernameIsLocked] = useState(true);
    const [passwordIsLocked, setPasswordIsLocked] = useState(true);


    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleCheckChange = (setStateFunction) => {
        if (setStateFunction === "username") setUsernameIsLocked(prevState => !prevState);
        if (setStateFunction === "password") setPasswordIsLocked(prevState => !prevState);
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        // get email from parent
        formData.email = props.email;

        // ensure both passwords are the same before update
        if (formData.password === formData.confirmedPassword) {
            fetch("http://localhost/chocolatevista_api/user/updateUser.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            })
            .then((response) => response.json())
            .then((data) => {
                console.log(data.message);

                // update logged in user data
                setUserData({
                    userID: userData.userID,
                    imgUrl: userData.imgUrl,
                    email: userData.email,
                    username: formData.username,
                    isLoggedIn: true,
                });

            })
            .catch((error) => {
                console.error("Error:", error);
            });
        }
        else {
            alert("Passwords don't match");
        }
    };

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Update Your Details
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Check
                    type="switch"
                    id="custom-switch-username"
                    label="Check this switch"
                    onChange={() => handleCheckChange("username")}
                />
                <FloatingLabel
                    controlId="floatingInput"
                    label="New Username"
                    className="mb-3"
                >
                    <Form.Control 
                        type="text" 
                        name="username"
                        value={formData.username}
                        onChange={handleFormChange}
                        placeholder="Username"
                        disabled={usernameIsLocked}
                    />
                </FloatingLabel>

                <Form.Check
                    type="switch"
                    id="custom-switch-password"
                    label="Check this switch"
                    onChange={() => handleCheckChange("password")}
                />
                <FloatingLabel 
                    controlId="floatingPassword" 
                    label="New Password"
                    className="mb-3"
                >
                    <Form.Control 
                        type="password" 
                        name="password"
                        value={formData.password}
                        onChange={handleFormChange}
                        placeholder="Password"
                        disabled={passwordIsLocked}
                    />
                </FloatingLabel>

                <FloatingLabel 
                    controlId="floatingPasswordConfirm" 
                    label="Confirm Password"
                    className="mb-3"
                >
                    <Form.Control 
                        type="password" 
                        name="confirmedPassword"
                        value={formData.confirmedPassword}
                        onChange={handleFormChange}
                        placeholder="Password"
                        disabled={passwordIsLocked}
                    />
                </FloatingLabel>
            </Modal.Body>
            <Modal.Footer>
                <Link to="/profile">
                    <Button onClick={handleSubmit}>Update</Button>
                </Link>
            </Modal.Footer>
        </Modal>
    );
};

export default UpdateUserInfo;
