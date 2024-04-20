// dependencies
import { useState, useEffect, useContext } from "react";

// components
import UserContext from '../../UserContext';
import ChocCard from "../common/ChocCard";

// style
import "./css/user-favourites.css";


let UserFavourites = () => {
    const {userData: user, setUserData} = useContext(UserContext);
    
    const [chocolates, setChocolates] = useState([]);
    const [noChocolatesDisplay, setNoChocolatesDisplay] = useState(false);
    const [favorites, setFavorites] = useState({}); // state to store favorite status of each choc
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);



    useEffect(() => {
        const fetchData = async () => {
            setIsPending(true);
            setError(null);

            try {
                const response = await fetch(
                    "http://localhost/chocolatevista_api/favourite/getUserFavourites.php",
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
                    // read chocolates data
                    const fetchedChocolates = jsonData.chocolatesData.map(chocData => {
                        const [chocID, name, imgUrl, rating, numRatings] = chocData;
                        return { chocID, name, imgUrl, rating, numRatings };
                    });
                    // update the chocolates state with the fetched chocolates
                    setChocolates(fetchedChocolates); 
                    setNoChocolatesDisplay(false);
            
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
                else {
                    setNoChocolatesDisplay(true);
                }
                
            } catch (error) {
                setError(error.message);
            }

            setIsPending(false);
        };

        fetchData();
        
    }, []);

    return (
        <div className="user-favourites">
            <span className="user-favourites-title">Your Favourites</span>
            <div className="favourites-cards-container">
            {true ? (
              <div className="favourites-cards">
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
            ) : (
                <div>
                    You currently have no favourites
                </div>
            )}
            </div>
        </div>
    )
}

export default UserFavourites;
