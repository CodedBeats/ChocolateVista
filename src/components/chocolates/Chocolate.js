// dependencies
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';

// components
import AdditionalInformation from './AdditionalInformation';
import ChocolateReviews from './ChocolateReviews';
import StarRating from '../common/StarRating';

// style
import "./css/chocolate.css"


let Chocolate = () => {
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
    const [reviewsVisible, setReviewsVisible] = useState(false);

    const handleTabs = () => {
        setReviewsVisible(prevState => !prevState);
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
        <div className="choc-container">
            <div className="choc-img-container">
                <Image src={chocolate.imgUrl} className="choc-img" rounded />
            </div>

            <div className="choc-details-container">
                <div className="choc-title-box">
                    <p>{chocolate.name}</p>
                    <p>--isFavourited</p>
                </div>
                <div className="choc-rating-box">
                    <StarRating rating={chocolate.rating} numRatings={chocolate.numRatings} id={chocolate.chocID} static={false} />
                </div>
                <p>Description</p>
                <p>{chocolate.description}</p>
            </div>

            <div className="details-and-reviews-container">
                <Button 
                    variant="outline-secondary" 
                    onClick={handleTabs}
                    disabled={!reviewsVisible}
                >Additional Info</Button>
                <Button 
                    variant="outline-secondary" 
                    onClick={handleTabs}
                    disabled={reviewsVisible}
                >Reviews</Button>

                {!reviewsVisible ? 
                    <div className="additional-details-container">
                        <AdditionalInformation chocolate={chocolate} />
                    </div>
                    :
                    <div>
                        <ChocolateReviews chocID={chocolate.chocID} />
                    </div>
                }
            </div>
        </div>
        </>
    );
}

export default Chocolate;
