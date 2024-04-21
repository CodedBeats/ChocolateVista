// dependencies
import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';

// components
import UserContext from '../../UserContext';
import AdditionalInformation from './AdditionalInformation';
import ChocolateReviews from './ChocolateReviews';
import StarRating from '../common/StarRating';
import FavouriteIcon from '../common/FavouriteIcon';

// style
import "./css/chocolate.css"


let Chocolate = () => {
    const {userData: user} = useContext(UserContext);
    const { id: currentId } = useParams();

    const [chocolate, setChocolate] = useState({
        chocID: "",
        name: "",
        description: "",
        imgUrl: "",
        price: "",
        rating: "",
        numRatings: "",
        ingredients: "",
        flavors: "",
        weight: "",
        packaging: "",
        allergenInformation: "",
        expirationTime: "",
        origin: "",
        certifications: ""
    });
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    const [isFavorited, setIsFavorited] = useState(false);
    const [reviewsVisible, setReviewsVisible] = useState(false);
    const [button1Color, setButton1Color] = useState("rgb(219, 219, 219)");
    const [button2Color, setButton2Color] = useState("rgb(66, 66, 66)");

    const handleTabs = (buttonNumber) => {
        setReviewsVisible(prevState => !prevState);
        // Toggle colors of both buttons simultaneously
        setButton1Color(prevColor => prevColor === "rgb(219, 219, 219)" ? "rgb(66, 66, 66)" : "rgb(219, 219, 219)");
        setButton2Color(prevColor => prevColor === "rgb(219, 219, 219)" ? "rgb(66, 66, 66)" : "rgb(219, 219, 219)");
    }

    useEffect(() => {
        const fetchData = async () => {
            setIsPending(true);
            setError(null);

            try {
                const response = await fetch(
                    "http://localhost/chocolatevista_api/chocolate/getChocolate.php",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ id: currentId })
                    }
                );

                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }

                const jsonData = await response.json();

                const [
                    chocID,
                    name,
                    description,
                    imgUrl,
                    price,
                    rating,
                    numRatings,
                    ingredients,
                    flavors,
                    weight,
                    packaging,
                    allergenInformation,
                    expirationTime,
                    origin,
                    certifications
                ] = jsonData.chocData;

                setChocolate({
                    chocID,
                    name,
                    description,
                    imgUrl,
                    price,
                    rating,
                    numRatings,
                    ingredients,
                    flavors,
                    weight,
                    packaging,
                    allergenInformation,
                    expirationTime,
                    origin,
                    certifications
                });

                // check if chocolate is favorited
                const isFavResponse = await fetch("http://localhost/chocolatevista_api/favourite/getIsUserFavourite.php", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ userID: user.userID, chocolateID: chocID })
                });
                
                if (!isFavResponse.ok) {
                    throw new Error('Failed to fetch favorite status');
                }

                const isFavData = await isFavResponse.json();
                setIsFavorited(isFavData.success);
            } catch (error) {
                setError(error.message);
            }

            setIsPending(false);
        };

        if (currentId) {
            fetchData();
        }

    }, [currentId]);

    return (
        <>
        <div className="chocolcate-container">
            <div className="chocolate-img-container-wrapper">
                <div className="chocolate-img-container">
                    <Image src={chocolate.imgUrl} className="chocolate-img" rounded />
                </div>

                <div className="choc-details-container">
                    <div className="choc-title-box">
                        <p className="choc-title-name">{chocolate.name}</p>
                        <div className="chocolate-favourite-icon">
                            <FavouriteIcon 
                                isFavorited={isFavorited} 
                                userID={user.userID}
                                chocolateID={chocolate.chocID}
                            />
                        </div>
                    </div>
                    <div className="choc-rating-box">
                        <StarRating rating={chocolate.rating} numRatings={chocolate.numRatings} id={chocolate.chocID} static={false} />
                    </div>
                    <p className="choc-title-description">Description</p>
                    <p>{chocolate.description}</p>
                </div>
            </div>

            <div className="details-and-reviews-container">
                <button 
                    className="chocolate-details-tab"
                    onClick={() => handleTabs(1)}
                    disabled={!reviewsVisible}
                    style={{ backgroundColor: button1Color }}
                >
                    Additional Info
                </button>
                <button 
                    className="chocolate-details-tab"
                    onClick={() => handleTabs(2)}
                    disabled={reviewsVisible}
                    style={{ backgroundColor: button2Color }}
                >
                    Reviews
                </button>

                {!reviewsVisible ? 
                    <div className="additional-details-container">
                        <AdditionalInformation chocolate={chocolate} />
                    </div>
                    :
                    <div className="additional-details-reviews-container">
                        <ChocolateReviews chocID={chocolate.chocID} />
                    </div>
                }
            </div>
        </div>
        </>
    );
}

export default Chocolate;
