// dependencies
import { Link, useLocation } from "react-router-dom";

// components
import UserInfo from "./UserInfo";
import UserReviews from "./UserReviews";

// style
import "./css/profile.css";


let Profile = () => {
    

    return (
        <div className="profile-container">
            <div className="user-info-container">
                <UserInfo />
            </div>
            <div className="favorites-container">
                Favourites Here
            </div>
            <div className="reviews-container">
                <UserReviews />
            </div>
        </div>
    )
}

export default Profile;
