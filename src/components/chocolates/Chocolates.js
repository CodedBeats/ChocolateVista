// dependencies
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';

// components
import ChocCard from '../common/ChocCard';
import Filters from './Filters';

// hooks
import useFetch from '../../hooks/useFetch';

// style
import "./css/chocolates.css";


let Chocolates = () => {
    // choc obj and arr of chocs
    const [chocolates, setChocolates] = useState([]);
    const [chocolatesLength, setChocolatesLength] = useState(0);
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
            }
        }
    }, [chocolatesData, filterValues, chocolates.length]);

    
    return (
        <>
        <div>
            <p className="chocolates-found">{chocolatesLength} Chocolates Found</p>
            <div>
                <Filters 
                    onFilterChange={handleFilterChange} 
                    numRatingsVal={numRatingsFilterVal}
                    setNumRatingsVal={setNumRatingsFilterVal}
                    priceVal={priceVal}
                    setPriceVal={setPriceVal}
                    weightVal={weightVal}
                    setWeightVal={setWeightVal}
                />
                <Button onClick={clearFilterValues} variant="outline-warning">X Reset Filters</Button>
            </div>
            {noChocsDisplay 
                ? <div>No Chocolates Found</div>
                : <div className="all-chocolates-container">
                    {chocolates.map((chocolate, index) => (
                        <div key={index}>
                            <ChocCard chocID={chocolate} choc={chocolate} static={false} />
                        </div>
                    ))}
                </div>
            }
        </div>
        </>
    )
}

export default Chocolates;
