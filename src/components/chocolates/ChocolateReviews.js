// dependencies
import { useState, useEffect, useContext } from "react";
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';

// components
import UserContext from '../../UserContext';
import ReviewCard from "../common/ReviewCard";
import CustomToast from "../common/CustomToast";

// style
import "./css/chocolate-review.css";


const ChocolateReviews = (props) => {
    const {userData: user} = useContext(UserContext);
    const [reviews, setReviews] = useState([]);
    const [noReviewsDisplay, setNoReviewsDisplay] = useState(false);
    const [creatingReview, setCreatingReview] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [inputText, setInputText] = useState("");
    const [inputError, setInputError] = useState("");
    const [editingReview, setEditingReview] = useState(false);
    const [editReviewID, setEditReviewID] = useState(null);
    const [currentlyEditing, setCurrentlyEditing] = useState([]);
    const [reviewAdded, setReviewAdded] = useState(false);
    const [reviewUpdated, setReviewUpdated] = useState(false);
    const [reviewRemoved, setReviewRemoved] = useState(false);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsPending(true);
            setError(null);

            try {
                const response = await fetch(
                    "http://localhost/chocolatevista_api/review/getChocolateReviews.php",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ chocID: props.chocID })
                    }
                );

                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }

                const jsonData = await response.json();

                if (jsonData.success) {
                    // read reviews data
                    const fetchedReviews = jsonData.reviewsData.map(reviewData => {
                        const [reviewID, text, imgUrl, name] = reviewData;
                        return { reviewID, text, imgUrl, name };
                    });
                    // update the reviews array with fetchedReviews
                    setReviews(fetchedReviews);
                    setNoReviewsDisplay(false);
                }
                else {
                    setNoReviewsDisplay(true);
                }
                
            } catch (error) {
                setError(error.message);
            }

            setIsPending(false);
        };

        fetchData();
        
    }, [props.chocID, reviewAdded, reviewUpdated, reviewRemoved]);


    const toggleCreateReview = () => {
        setIsOpen(prevState => !prevState);
        setCreatingReview(prevState => !prevState);
        setEditingReview(false);
        setCurrentlyEditing([]);
        setInputText("");
    }

    const handleInputTextChange = (e) => {
        let filteredText = e.target.value;
        // get blacklist from .env, this way you don't have to see the words :)
        const blacklist = process.env.REACT_APP_BLACKLIST.split(',');
    
        // check if input text contains any word from blacklist
        blacklist.forEach((badWord) => {
            // regex to match bad word globally
            const regex = new RegExp(badWord.trim(), 'gi');
            filteredText = filteredText.replace(regex, "");
        });
    
        setInputText(filteredText);
    
        // clear error message when user starts typing
        setInputError("");
    };

    const handleReviewSubmit = () => {
        // tell user to enter text
        if (inputText.trim() === "") {
            setInputError("Please fill out this field");
            return;
        }

        fetch("http://localhost/chocolatevista_api/review/addReview.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userID: user.userID,
                    chocID: props.chocID,
                    reviewText: inputText
                }),
            })
            .then((response) => response.json())
            .then((data) => {
                console.log(data.message);
                
                setIsOpen(prevState => !prevState);
                setCreatingReview(prevState => !prevState);
                setReviewAdded(prevState => !prevState);
                // clear input and error message when review is successfully submitted
                setInputText("");
                setInputError("");

                // notify user successful review create
                CustomToast("Review Created Successfully", "success"); 
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }

    const handleDelete = (reviewID) => {
        fetch("http://localhost/chocolatevista_api/review/deleteReview.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    reviewID: reviewID
                }),
            })
            .then((response) => response.json())
            .then((data) => {
                console.log(data.message);
                setReviewRemoved(prevState => !prevState);

                // notify user successful review delete
                CustomToast("Review Deleted Successfully", "success"); 
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }

    const handleEdit = (reviewID, currentText) => {
        setIsOpen(<FontAwesomeIcon icon={faArrowUp} />);
        setInputText(currentText);
        setEditingReview(true);
        setCreatingReview(true);
        setEditReviewID(reviewID);
        setCurrentlyEditing((prevEditing) => {
            return prevEditing.includes(reviewID)
                ? prevEditing.filter((editingId) => editingId !== reviewID)
                : [...prevEditing, reviewID];
        });
    }

    const handleEditSubmit = () => {
        // tell user to enter text
        if (inputText.trim() === "") {
            setInputError("Please fill out this field");
            return;
        }

        fetch("http://localhost/chocolatevista_api/review/editReview.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    reviewID: editReviewID,
                    inputText: inputText
                }),
            })
            .then((response) => response.json())
            .then((data) => {
                console.log(data.message);

                setIsOpen(prevState => !prevState);
                setCreatingReview(prevState => !prevState);
                setReviewUpdated(prevState => !prevState);
                setCurrentlyEditing([]);
                // clear input and error message when review is successfully submitted
                setInputText("");
                setInputError("");

                // notify user successful review update
                CustomToast("Review Updated Successfully", "success"); 
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }


    return (
        <div>
            { user.isLoggedIn &&
                <div className="create-review-container">
                    <button onClick={toggleCreateReview} className="changing-review-btn">
                        {!editingReview ? "Create" : "Update"} Review&nbsp;
                        {isOpen ? <FontAwesomeIcon icon={faArrowUp} /> : <FontAwesomeIcon icon={faArrowDown} />}
                    </button>
                    {/* only show on create click */}
                    {creatingReview && 
                        <div className="choc-review-card-create-container">
                            <div className="create-sect-left">
                                <div className="review-user-img-container">
                                    <Image src={user.imgUrl} alt="Logo" className="review-user-img" rounded />
                                </div>
                                <div className="review-title">{user.username}</div>
                                { !editingReview ?
                                    <Button variant="success" onClick={handleReviewSubmit}>Create</Button>
                                :
                                    <Button variant="success" onClick={handleEditSubmit}>Update</Button>
                                }
                            </div>
                            <div className="choc-review-text">
                            <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Control 
                                as="textarea" 
                                rows={3} 
                                value={inputText} 
                                onChange={handleInputTextChange} 
                            />
                            {inputError && <Form.Text className="text-danger">{inputError}</Form.Text>}
                            </Form.Group>
                            </div>
                        </div>
                    }
                </div>
            }
            <div className="chocolate-review-cards-container">
            {!noReviewsDisplay ? (
                reviews.map((review, index) => (
                    <div key={index} className="chocolate-review-card">
                        <ReviewCard 
                            review={review} 
                            chocolateReviews={true}
                            currentlyEditing={currentlyEditing.includes(review.reviewID)}
                            canEdit={review.name === user.username ? true : false} 
                            onClickEdit={(id) => handleEdit(id, review.text)} 
                            onClickDelete={(id) => handleDelete(id)} 
                        />
                    </div>
                ))
            ) : (
                <div className="no-reviews-title">
                    This chocolate currently has no reviews
                </div>
            )}
            </div>
        </div>
    );
};

export default ChocolateReviews;
