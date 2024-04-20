// dependencies
import Dropdown from 'react-bootstrap/Dropdown';

// style
import "./css/filters.css";

let Filters = ({ onFilterChange, numRatingsVal, setNumRatingsVal, priceVal, setPriceVal, weightVal, setWeightVal }) => {

    const handleInputChange = (filterName, value, type) => {
        onFilterChange(filterName, value);

        if (type == 1) {
            setNumRatingsVal(value);
        }
        else if (type == 2) {
            setPriceVal(value);
        }
        else {
            setWeightVal(value);
        }
    };

    return (
        <div className="filters">
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic" className="filter-btn-dropdown">
                Num of Ratings: <span dangerouslySetInnerHTML={{ __html: numRatingsVal && `&gt;${numRatingsVal}` }} />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleInputChange("numRatingsFilter", 1, 1)}>More than 1</Dropdown.Item>
                <Dropdown.Item onClick={() => handleInputChange("numRatingsFilter", 5, 1)}>More than 5</Dropdown.Item>
                <Dropdown.Item onClick={() => handleInputChange("numRatingsFilter", 10, 1)}>More than 10</Dropdown.Item>
                <Dropdown.Item onClick={() => handleInputChange("numRatingsFilter", 50, 1)}>More than 50</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic" className="filter-btn-dropdown">
                Price: <span dangerouslySetInnerHTML={{ __html: priceVal && `&lt;${priceVal}` }} />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleInputChange("price", 150, 2)}>Less than $150</Dropdown.Item>
                <Dropdown.Item onClick={() => handleInputChange("price", 100, 2)}>Less than $100</Dropdown.Item>
                <Dropdown.Item onClick={() => handleInputChange("price", 50, 2)}>Less than $50</Dropdown.Item>
                <Dropdown.Item onClick={() => handleInputChange("price", 20, 2)}>Less than $20</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic" className="filter-btn-dropdown">
                Weight: <span dangerouslySetInnerHTML={{ __html: weightVal && `&gt;${weightVal}` }} />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleInputChange("weight", 20, 3)}>More than 20g</Dropdown.Item>
                <Dropdown.Item onClick={() => handleInputChange("weight", 500, 3)}>More than 500g</Dropdown.Item>
                <Dropdown.Item onClick={() => handleInputChange("weight", 1000, 3)}>More than 1000g</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
};

export default Filters;
