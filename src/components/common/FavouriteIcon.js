// dependecies
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';

// components
import CustomToast from "../common/CustomToast";

const FavouriteIcon = (props) => {
    const [isFavorited, setIsFavorited] = useState();
    const [icon, setIcon] = useState(props.isFavorited ? solidHeart : regularHeart);
    const color = "red";
    const [notifyMessage, setNotifyMessage] = useState("");

    useEffect(() => {
        setIsFavorited(props.isFavorited);
        setIcon(props.isFavorited ? solidHeart : regularHeart);
        setNotifyMessage(props.isFavorited ? "Favourite Removed" : "Favourite Added");
    }, [props.isFavorited])
    

    const toggleFavorite = () => {
        let url = "";
        if (isFavorited) {
            url = "http://localhost/chocolatevista_api/favourite/deleteFavourite.php";
            setNotifyMessage(isFavorited ? "Favourite Added" : "Favourite Removed");
        }
        else if (isFavorited == false && isFavorited != null) {
            console.log(isFavorited)
            url = "http://localhost/chocolatevista_api/favourite/addFavourite.php";
            setNotifyMessage(isFavorited ? "Favourite Added" : "Favourite Removed");
        }

        const data = {
            userID: props.userID,
            chocolateID: props.chocolateID
        };

        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.message);
            setIsFavorited(prevState => !prevState);
            setIcon(prevIcon => (prevIcon === solidHeart ? regularHeart : solidHeart));

            // notify user favourite updated
            CustomToast(notifyMessage, "success");
        })
        .catch(error => {
            console.error("Error:", error);
        });
    };

    return (
        <>
        {props.static ? (
            <FontAwesomeIcon icon={icon} style={{ color }} />
        ) : (
            <button onClick={toggleFavorite}>
                <FontAwesomeIcon icon={icon} style={{ color }} />
            </button>
        )}
        </>
    );
}

export default FavouriteIcon;
