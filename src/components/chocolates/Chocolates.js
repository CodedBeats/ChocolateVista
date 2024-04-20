// dependencies
import { useState, useEffect, useContext } from 'react';
import Button from 'react-bootstrap/Button';

// components
import UserContext from '../../UserContext';
import ChocCard from '../common/ChocCard';
import Filters from './Filters';

// hooks
import useFetch from '../../hooks/useFetch';

// style
import "./css/chocolates.css";


let Chocolates = () => {
    const {userData: user} = useContext(UserContext);
    // choc obj and arr of chocs
    const [chocolates, setChocolates] = useState([]);
    const [chocolatesLength, setChocolatesLength] = useState(0);
    const [favorites, setFavorites] = useState({}); // state to store favorite status of each choc
    const [noChocsDisplay, setNoChocsDisplay] = useState(false);
    const [filterValues, setFilterValues] = useState({
        numRatingsFilter: null,
        price: null,
        weight: null
    });
    const [numRatingsFilterVal, setNumRatingsFilterVal] = useState("");
    const [priceVal, setPriceVal] = useState("");
    const [weightVal, setWeightVal] = useState("");
    
    const { data: chocolatesData, isPending, error } = useFetch(
        "http://localhost/chocolatevista_api/chocolate/getAllChocolates.php",
        "POST",
        filterValues
    );

    const handleFilterChange = (filterName, value) => {
        setFilterValues(prevState => ({
            ...prevState,
            [filterName]: value
        }));
    };

    const clearFilterValues = () => {
        setFilterValues({ numRatingsFilter: null, price: null, weight: null });
        setNumRatingsFilterVal("");
        setPriceVal("");
        setWeightVal("");
    }


    // Fetch chocolates on load or filters change
    useEffect(() => {
        if (chocolatesData) { 
            if (!chocolatesData.success) {
                setNoChocsDisplay(true);
                setChocolatesLength(0);
                setChocolates([]);
            } else {
                setNoChocsDisplay(false);
                const fetchedChocolates = chocolatesData.chocsData.map(chocData => {
                    const [chocID, name, imgUrl, rating, numRatings] = chocData;
                    return { chocID, name, imgUrl, rating, numRatings };
                });
                setChocolates(fetchedChocolates);
                setChocolatesLength(chocolates.length);

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
        }
    }, [chocolatesData, filterValues, chocolates.length]);

    
    return (
        <div className="chocolates-page-container">
            <div className="filters-container-wrapper">
                <p className="chocolates-found">{chocolatesLength} Chocolates Found</p>
                <p className="filters-container-title">Filter by Tag</p>
                <Button onClick={clearFilterValues} variant="warning" className="reset-filters-btn">X Reset Filters</Button>
                <div className="filters-container">
                    <Filters 
                        onFilterChange={handleFilterChange} 
                        numRatingsVal={numRatingsFilterVal}
                        setNumRatingsVal={setNumRatingsFilterVal}
                        priceVal={priceVal}
                        setPriceVal={setPriceVal}
                        weightVal={weightVal}
                        setWeightVal={setWeightVal}
                    />
                </div>
            </div>
            {noChocsDisplay 
                ? <div className="no-chocolates-found-txt">No Chocolates Found</div>
                : <div className="all-chocolates-container">
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
            }
        </div>
    )
}

export default Chocolates;
