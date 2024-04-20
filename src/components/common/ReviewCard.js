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
                <div>{props.review.text}</div>
                {/* Display edit and delete buttons if user can edit */}
                {props.canEdit && (
                    <div className="review-btns-sect">
                        {!props.canOnlyDelete ? 
                            !props.currentlyEditing && props.chocolateReviews ? (
                                <>
                                <button className="review-btn" onClick={() => props.onClickEdit(props.review.reviewID)}>
                                    <FontAwesomeIcon icon={faPencilAlt} />
                                </button>
                                <button className="review-btn" onClick={() => props.onClickDelete(props.review.reviewID)}>
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                                </>
                            ) : (
                                <>
                                <div className="currently-editing">editing...</div>
                                <button className="review-btn" onClick={() => props.onClickDelete(props.review.reviewID)}>
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                                </>
                            ) 
                        : 
                            <button className="review-btn" onClick={() => props.onClickDelete(props.review.reviewID)}>
                                <FontAwesomeIcon icon={faTrash} />
                            </button>
                        }
                    </div>
                )}
            </div>
        </div>
    );
}

export default ReviewCard;
