// dependencies
import { useState, useContext } from "react";
import { Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faUser, faLock } from '@fortawesome/free-solid-svg-icons';

// components
import UserContext from '../../UserContext';
import CustomToast from "../common/CustomToast";

// style
import "./css/register.css";


let RegisterForm = () => {
    const navigate = useNavigate();
    const {setUserData} = useContext(UserContext);

    const [formData, setFormData] = useState({
        imgUrl: "",
        email: "",
        username: "",
        password: "",
    });
    const [errors, setErrors] = useState({
        email: "",
        username: "",
        password: "",
    });

    const handleChange = (e) => {
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

        // set random avatar img
        const randomAvatar = `/imgs/user/${Math.floor(Math.random() * 12) + 1}.png`;
        setFormData(prevState => ({
            ...prevState,
            imgUrl: randomAvatar
        }));
    };


    // login user
    const getUserData = () => {
        fetch("http://localhost/chocolatevista_api/user/getUserByEmail.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                console.log(data.userData);

                // set user data for context (login user)
                setUserData({
                    userID: data.userData[0],
                    imgUrl: data.userData[1],
                    email: data.userData[2],
                    username: data.userData[3],
                    isLoggedIn: true,
                });

                // navigate home
                navigate("/");
            } else {
                console.log(data.message);
            }
        })
        .catch((error) => {
            console.error("Error:", error);
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        let formValid = true;
        const newErrors = {};

        // check if form fields are empty
        if (formData.email === "") {
            newErrors.email = "Please fill out this field";
            formValid = false;
        }
        if (formData.username === "") {
            newErrors.username = "Please fill out this field";
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

        fetch("http://localhost/chocolatevista_api/auth/registerFormSubmit.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                console.log("Register successful");
                // console.log(data.userData);

                // get user data for context
                getUserData();

                // toast alert successful register
                CustomToast("Account Created Successfully", "success");
            } else {
                console.log(data.message);
            }
        })
        .catch((error) => {
            console.error("Error:", error);
        });
    };


    return (
        <div className="register-page-container">
            <div className="register-form-container">
                <span className="register-title">Register</span>
                <Form className="form-wrapper">
                    <Form.Group controlId="email">
                        <div className="form-input-container">
                            <Form.Control
                                className="form-input"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter email"
                            />
                            <FontAwesomeIcon icon={faEnvelope} />
                        </div>
                        {errors.email && <Form.Text className="text-danger">{errors.email}</Form.Text>}
                    </Form.Group>

                    <Form.Group controlId="username">
                        <div className="form-input-container">
                            <Form.Control
                                className="form-input"
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                placeholder="Enter your username"
                            />
                            <span><FontAwesomeIcon icon={faUser}/></span>
                        </div>
                        {errors.username && <Form.Text className="text-danger">{errors.username}</Form.Text>}
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
                    Register
                </button>

                <div>
                    Already have an account? 
                    <Link to="/login" className="register-link">
                        <span>Login</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default RegisterForm;
