// dependencies
import Image from 'react-bootstrap/Image';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';

// style
import "./css/review-card.css";

let ReviewCard = (props) => {
    return (
        <div className="review-card-container">
            <div className="review-user-img-container">
                <Image src={props.review.imgUrl} alt="Logo" className="review-user-img" rounded />
            </div>
            <div className="review-title">
                { props.isLinked ?
                    <Link to={props.chocLink}>
                        {props.review.name}
                    </Link>
                :
                    props.review.name
                }
            </div>
            <div className="review-text">
                {props.review.text}
                {/* can only delete and edit if usernames match */}
                { props.canEdit &&
                <div>
                    { props.chocolateReviews &&
                        <button className="delete-btn" onClick={() => props.onClickEdit(props.review.reviewID)}>
                            { !props.currentlyEditing ?
                                <FontAwesomeIcon icon={faPencilAlt} />
                            :
                                <div>editing...</div>
                            }
                        </button>
                    }
                    <button className="delete-btn" onClick={() => props.onClickDelete(props.review.reviewID)}>
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                </div>
                }
            </div>
        </div>
    );
}

export default ReviewCard;
