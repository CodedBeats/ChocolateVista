// dependencies
import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

// components
import UserContext from '../../UserContext';
import ReviewCard from "../common/ReviewCard";

// style
import "./css/user-review.css";


let UserReviews = () => {
    const {userData: user, setUserData} = useContext(UserContext);
    const navigate = useNavigate();
    
    const [reviews, setReviews] = useState([]);
    const [noReviewsDisplay, setNoReviewsDisplay] = useState(false);
    const [reviewLink, setReviewLink] = useState(null);
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
                    "http://localhost/chocolatevista_api/review/getUserReviews.php",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ userID: user.userID })
                    }
                );

                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }

                const jsonData = await response.json();

                if (jsonData.success) {
                    // read reviews data
                    const fetchedReviews = jsonData.reviewsData.map(reviewData => {
                        const [reviewID, chocID, text, name, imgUrl] = reviewData;
                        return { reviewID, chocID, text, name, imgUrl };
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
        
    }, [reviewUpdated, reviewRemoved]);

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
                
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }

    // const chocLink = `/chocolates/${props.choc.chocID}/${props.choc.name}`;
    return (
        <div className="user-reviews">
            <div className="review-cards-container">
            {!noReviewsDisplay ? (
                reviews.map((review, index) => {
                    const currentReviewLink = `/chocolates/${review.chocID}/${review.name}`;
                    return (
                        <div key={index}>
                            <div className="review-card-link">
                                <ReviewCard 
                                    review={review} 
                                    canEdit={true} 
                                    onClickDelete={(id) => handleDelete(id)} 
                                    isLinked={true}
                                    chocLink={currentReviewLink}
                                />
                            </div>
                        </div>
                    );
                })
            ) : (
                <div>
                    This chocolate currently has no reviews
                </div>
            )}
            </div>
        </div>
    )
}

export default UserReviews;
