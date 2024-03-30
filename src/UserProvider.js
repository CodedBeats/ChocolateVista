import { useState } from "react";
import UserContext from "./UserContext";

function UserProvider({ children }) {
    const [userData, setUserData] = useState({
        userID: "",
        imgUrl: "",
        email: "",
        username: "",
        isLoggedIn: false,
    });

    return (
        <UserContext.Provider value={{ userData, setUserData }}>
            {children}
        </UserContext.Provider>
    );
}

export default UserProvider;
