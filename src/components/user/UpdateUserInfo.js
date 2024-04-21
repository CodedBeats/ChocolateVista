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
import CustomToast from "../common/CustomToast";

let UpdateUserInfo = (props) => {
    const {userData, setUserData} = useContext(UserContext);
    const [formData, setFormData] = useState({
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
    });
    const [usernameIsLocked, setUsernameIsLocked] = useState(true);
    const [passwordIsLocked, setPasswordIsLocked] = useState(true);
    const [errors, setErrors] = useState({
        username: "",
        password: "",
        confirmPassword: "",
    });


    const handleFormChange = (e) => {
        const { name, value } = e.target;
        let filteredValue = value;
        
        // get blacklist from .env, this way you don't have to see the words :)
        const blacklist = process.env.REACT_APP_BLACKLIST.split(',');
    
        // check if input value contains any word from blacklist
        blacklist.forEach((badWord) => {
            // regex to match bad word globally
            const regex = new RegExp(badWord.trim(), 'gi');
            filteredValue = filteredValue.replace(regex, "");
        });
        
        setFormData((prevState) => ({
            ...prevState,
            [name]: filteredValue,
        }));
        // clear error message when user starts typing
        setErrors(prevState => ({
            ...prevState,
            [name]: ""
        }));
    };

    const handleCheckChange = (setStateFunction) => {
        if (setStateFunction === "username") {
            setUsernameIsLocked(prevState => !prevState)
            // clear text feild when enabling or disabling input group
            setFormData({
                email: formData.email,
                username: "",
                password: formData.password,
                confirmPassword: formData.confirmPassword,
            })
            // clear all errors when enabling or disabling input group
            setErrors({
                username: "",
                password: errors.password,
                confirmPassword: errors.confirmPassword,
            });
        }
        if (setStateFunction === "password") {
            setPasswordIsLocked(prevState => !prevState)
            // clear text feilds when enabling or disabling input group
            setFormData({
                email: formData.email,
                username: formData.username,
                password: "",
                confirmPassword: "",
            })
            // clear all errors when enabling or disabling input group
            setErrors({
                username: errors.username,
                password: "",
                confirmPassword: "",
            });
        }
    };

    const handleCloseModal = () => {
        // reset form data and errors to their initial state
        setFormData({
            email: "",
            username: "",
            password: "",
            confirmPassword: "",
        });
        setErrors({
            username: "",
            password: "",
            confirmPassword: "",
        });
        setUsernameIsLocked(true);
        setPasswordIsLocked(true);
        // close modal by calling onHide func provided by props
        props.onHide();
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        let formValid = true;
        const newErrors = {};

        // check if form fields are empty
        if (!usernameIsLocked && formData.username === "") {
            newErrors.username = "Please fill out this field";
            formValid = false;
        }
        if (!passwordIsLocked && formData.password === "") {
            newErrors.password = "Please fill out this field";
            formValid = false;
        }
        if (!passwordIsLocked && formData.confirmPassword === "") {
            newErrors.confirmPassword = "Please fill out this field";
            formValid = false;
        }

        // if any field is empty, set errors and return
        if (!formValid) {
            setErrors(newErrors);
            return;
        }

        // get email from parent
        formData.email = props.email;

        // handle empty passed form data
        

        // ensure both passwords are the same before update
        if (formData.password === formData.confirmPassword) {
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
                const updatedUserData = {
                    userID: userData.userID,
                    imgUrl: userData.imgUrl,
                    email: userData.email,
                    isLoggedIn: true,
                };
                // only update username if not empty
                formData.username !== "" ? updatedUserData.username = formData.username : updatedUserData.username = userData.username;
                setUserData(updatedUserData);

                // close modal HERE
                handleCloseModal();

                // notify user details updated successfully
                CustomToast("Details Updated Successfully", "success");
            })
            .catch((error) => {
                console.error("Error:", error);
            });
        }
        else {
            // notify user passwords don't match
            CustomToast("Passwords Do Not Match", "warning");
        }
    };

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            onHide={handleCloseModal}
        >
            <Modal.Header closeButton className="update-modal">
                <Modal.Title id="contained-modal-title-vcenter">
                    Update Your Details
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="update-modal">
                {/* username */}
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
                    {errors.username && <Form.Text className="text-danger">{errors.username}</Form.Text>}
                </FloatingLabel>

                {/* passwords */}
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
                    {errors.password && <Form.Text className="text-danger">{errors.password}</Form.Text>}
                </FloatingLabel>

                <FloatingLabel 
                    controlId="floatingPasswordConfirm" 
                    label="Confirm Password"
                    className="mb-3"
                >
                    <Form.Control 
                        type="password" 
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleFormChange}
                        placeholder="Password"
                        disabled={passwordIsLocked}
                    />
                    {errors.confirmPassword && <Form.Text className="text-danger">{errors.confirmPassword}</Form.Text>}
                </FloatingLabel>
            </Modal.Body>
            <Modal.Footer>
                <Link to="/profile">
                    <Button 
                        onClick={handleSubmit} 
                        disabled={passwordIsLocked && usernameIsLocked}
                    >
                        {passwordIsLocked && usernameIsLocked ? (
                            <div>Enter New Details</div>
                        ) : (
                            <div>Submit</div>
                        )}
                    </Button>
                </Link>
            </Modal.Footer>
        </Modal>
    );
};

export default UpdateUserInfo;
