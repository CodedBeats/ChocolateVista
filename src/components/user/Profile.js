// dependencies
import { Link, useLocation } from "react-router-dom";

// components
import UserInfo from "./UserInfo";
import UserReviews from "./UserReviews";
import UserFavourites from "./UserFavourites";

// style
import "./css/profile.css";


let Profile = () => {
    

    return (
        <div className="profile-container">
            <div className="user-info-container profile-card">
                <UserInfo />
            </div>
            <div className="reviews-container profile-card">
                <UserReviews />
            </div>
            <div className="favorites-container profile-card">
                <UserFavourites />
            </div>
        </div>
    )
}

export default Profile;
