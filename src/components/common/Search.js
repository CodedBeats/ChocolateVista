// dependencies
import { useState, useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

// style
import "./css/search.css";


const Search = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [chocolates, setChocolates] = useState([{
        chocID: "",
        name: ""
    }]);
    const [noChocsDisplay, setNoChocsDisplay] = useState(true);

    useEffect(() => {
        //
    }, []); 


    const handleInputChange = (e) => {
        e.preventDefault();
        const newValue = e.target.value;
        setSearchQuery(newValue);

        fetch("http://localhost/chocolatevista_api/chocolate/searchChocolate.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({search: newValue}),
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                // console.log(data.message);
                // console.log(data.chocsData);

                const fetchedChocolates = data.chocsData.map(chocData => {
                    const [chocID, name] = chocData;
                    return { chocID, name };
                });
                // update the chocolates array with fetchedChocolates
                setChocolates(fetchedChocolates); 
                setNoChocsDisplay(false);

            } else {
                // console.log(data.message);
                setNoChocsDisplay(true);
            }
        })
        .catch((error) => {
            console.error("Error:", error);
        });
    };

    const handleLinkClick = () => {
        // Reset search state when a link is clicked
        setSearchQuery("");
        setChocolates([]);
        setNoChocsDisplay(true);
    };


    return (
        <div className="search-container">
            <div className="search-wrapper">
                <input
                    className="search-input"
                    type="text"
                    value={searchQuery}
                    onChange={handleInputChange}
                    placeholder="Search by name..."
                />
                <FontAwesomeIcon icon={faSearch} className="search-icon" />
            </div>
            <ListGroup className="search-results">
                {!noChocsDisplay ?
                chocolates.map((choc, index) => (
                    <Link 
                        to={`/chocolates/${choc.chocID}/${choc.name}`}
                        onClick={handleLinkClick}
                        className="search-results-link"
                        key={choc.chocID}
                    >
                        <ListGroup.Item className={index === chocolates.length - 1 ? "last-search-results-item" : ""}>
                            <span className="search-results-link-text">{choc.name}</span>
                        </ListGroup.Item>
                    </Link>
                ))
                :
                <div></div>
                }
            </ListGroup>
        </div>
    );
};

export default Search;
