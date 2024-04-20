import { useState, useEffect } from "react";
import UserContext from "./UserContext";

function UserProvider({ children }) {
    const [userData, setUserData] = useState(() => {
        const storedUserData = localStorage.getItem("userData");
        return storedUserData ? JSON.parse(storedUserData) : {
            userID: "",
            imgUrl: "",
            email: "",
            username: "",
            isLoggedIn: false,
        };
    });

    useEffect(() => {
        // save userData to local storage whenever it changes
        localStorage.setItem("userData", JSON.stringify(userData));
    }, [userData]);

    return (
        <UserContext.Provider value={{ userData, setUserData }}>
            {children}
        </UserContext.Provider>
    );
}

export default UserProvider;
