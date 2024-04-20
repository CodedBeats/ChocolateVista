// dependencies
import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';

// components
import StarRating from "./StarRating";
import FavouriteIcon from "./FavouriteIcon";

// style
import "./css/choc-img.css";
import "./css/carousel.css";
import "./css/choc-card.css";


let ChocCard = (props) => {
    const chocLink = `/chocolates/${props.choc.chocID}/${props.choc.name}`;

    return (
        <Card className="choc-card-container">
            <Card.Body>
                <Link to={chocLink} className="choc-card-link">
                    <Card.Img variant="top" src={props.choc.imgUrl} alt={props.choc.name} className="choc-img" />
                    <Card.Title>
                        <div className="name-fave-container">
                            <span className="name">{props.choc.name}</span>
                            <FavouriteIcon isFavorited={props.isFavorited} userID={props.userID} chocolateID={props.choc.chocID} static={true} />
                        </div>
                    </Card.Title>
                </Link>

                <Card.Text>
                    <StarRating rating={props.choc.rating} numRatings={props.choc.numRatings} id={props.choc.chocID} static={true} />
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default ChocCard;
