// dependencies
import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';

// components
import StarRating from "./StarRating";

// style
import "./css/choc-img.css";
import "./css/carousel.css";


let ChocCard = (props) => {
    const chocLink = `/chocolates/${props.choc.chocID}/${props.choc.name}`;

    return (
        <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Link to={chocLink}>
                    <Card.Img variant="top" src={props.choc.imgUrl} alt={props.choc.name} className="choc-img" />
                    <Card.Title>{props.choc.name}</Card.Title>
                </Link>
                <Card.Subtitle className="mb-2 text-muted">Favorited: no</Card.Subtitle>
                <Card.Text>
                    <StarRating rating={props.choc.rating} numRatings={props.choc.numRatings} id={props.choc.chocID} static={true} />
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default ChocCard;
