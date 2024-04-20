// dependencies
import { useState, useEffect, useContext } from 'react';
import { Link } from "react-router-dom";

// components
import UserContext from '../../UserContext';
import ImageCarousel from "../common/ImageCarousel";
import ChocCard from '../common/ChocCard';

// hooks
import useFetch from '../../hooks/useFetch';

// style
import "./css/landing.css";
import "../common/css/carousel.css";


let Landing = () => {
    const {userData: user} = useContext(UserContext);
    // choc obj and arr of chocs
    const [chocolates, setChocolates] = useState([]);
    const [favorites, setFavorites] = useState({}); // state to store favorite status of each choc
    
    const { data: chocolatesData, isPending, error } = useFetch(
        "http://localhost/chocolatevista_api/chocolate/getRandom.php",
        "POST"
    );

    // imgs for carousel
    const carouselImage = [
        "/imgs/carousel/1.png", 
        "/imgs/carousel/2.png", 
        "/imgs/carousel/3.png", 
        "/imgs/carousel/4.png", 
        "/imgs/carousel/5.png", 
        "/imgs/carousel/6.png", 
        "/imgs/carousel/7.png", 
        "/imgs/carousel/8.png", 
    ];

    // fetch random chocolates on load
    useEffect(() => {
        // check if chocolatesData and chocolatesData.chocsData are not null/undefined
        if (chocolatesData && chocolatesData.chocsData) { 
            const fetchedChocolates = chocolatesData.chocsData.map(chocData => {
                const [chocID, name, imgUrl, rating, numRatings] = chocData;
                return { chocID, name, imgUrl, rating, numRatings };
            });
            // update the chocolates state with the fetched chocolates
            setChocolates(fetchedChocolates); 
            
            // check favorite status for each chocolate
            fetchedChocolates.forEach(chocolate => {
                fetch("http://localhost/chocolatevista_api/favourite/getIsUserFavourite.php", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ userID: user.userID, chocolateID: chocolate.chocID })
                })
                .then(response => response.json())
                .then(data => {
                    setFavorites(prevFavorites => ({
                        ...prevFavorites,
                        // update favorites state with the result
                        [chocolate.chocID]: data.success 
                    }));
                })
                .catch(error => console.error("Error checking favorite status:", error));
            });
        }
    }, [chocolatesData]);

    return (
        <div className="landing-page">
            <div className="carousel-section-container">
                <ImageCarousel images={carouselImage} imageClass="landing-carousel-image" />
                <Link to="/chocolates" className="chocolates-link">
                    <div className="chocolates-link-container">
                            <h4 className="chocolates-link-text">All Chocolates</h4>
                    </div>
                </Link>
            </div>

            <div className="random-chocolates-container">
                <div className="random-chocolates-title">Some Chocolates You Might Like</div>
                <div className="random-chocolates">
                    {chocolates.map((chocolate, index) => (
                        <div key={index}>
                            <ChocCard 
                                chocID={chocolate} 
                                choc={chocolate} 
                                isFavorited={favorites[chocolate.chocID]} 
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Landing;
