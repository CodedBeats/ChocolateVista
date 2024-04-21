// dependencies
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';

// components
import UserContext from '../../UserContext';
import CustomToast from "../common/CustomToast";

// styles
import "./css/login.css";


let LoginForm = () => {
    const navigate = useNavigate();
    const {setUserData} = useContext(UserContext);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        // clear error message when user starts typing
        setErrors(prevState => ({
            ...prevState,
            [name]: ""
        }));
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        let formValid = true;
        const newErrors = {};

        // check if form fields are empty
        if (formData.email === "") {
            newErrors.email = "Please fill out this field";
            formValid = false;
        }
        if (formData.password === "") {
            newErrors.password = "Please fill out this field";
            formValid = false;
        }

        // if any field is empty, set errors and return
        if (!formValid) {
            setErrors(newErrors);
            return;
        }

        fetch("http://localhost/chocolatevista_api/auth/loginFormSubmit.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                console.log("Login successful");
                // console.log(data.userData);

                // set user data for context
                setUserData({
                    userID: data.userData[0],
                    imgUrl: data.userData[1],
                    email: data.userData[2],
                    username: data.userData[3],
                    isLoggedIn: true,
                });

                // navigate to home (or maybe last page)
                navigate("/");

                // toast alert successful login
                CustomToast("Login Successful", "success");
            } else {
                console.log(data.message);

                // toast alert failed login
                CustomToast(data.message, "warning");
            }
        })
        .catch((error) => {
            console.error("Error:", error);
        });
    };


    return (
        <div className="login-page-container">
            <div className="login-form-container">
                <span className="login-title">Login</span>
                <Form className="form-wrapper">
                    <Form.Group controlId="email">
                        <div className="form-input-container">
                            <Form.Control
                                className="form-input"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email"
                            />
                            <FontAwesomeIcon icon={faEnvelope} />
                        </div>
                        {errors.email && <Form.Text className="text-danger">{errors.email}</Form.Text>}
                    </Form.Group>

                    <Form.Group controlId="password">
                        <div className="form-input-container">
                            <Form.Control
                                className="form-input"
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Password"
                            />
                            <span><FontAwesomeIcon icon={faLock}/></span>
                        </div>
                        {errors.password && <Form.Text className="text-danger">{errors.password}</Form.Text>}
                    </Form.Group>
                </Form>

                <button type="button" className="login-btn" onClick={handleSubmit}>
                    Login
                </button>

                <div>
                    Don't have an account? 
                    <Link to="/register" className="register-link">
                        <span>Register</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;
