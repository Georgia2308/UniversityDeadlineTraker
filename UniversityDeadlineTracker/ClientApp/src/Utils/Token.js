import { useState } from "react";

export const getToken = () => {
    return sessionStorage.getItem("token");
};

export const getUser = () => {
    return JSON.parse(sessionStorage.getItem("user"));
};

export const useToken = () => {
    const [token, setToken] = useState(getToken());

    const saveToken = (userToken, refreshToken, userData) => {
        // if (userToken === null && (userData === null || userData === undefined))
        if (!userToken && !userData) sessionStorage.clear();
        else {
            sessionStorage.setItem("token", userToken);
            sessionStorage.setItem("refreshToken", refreshToken);
            sessionStorage.setItem("user", JSON.stringify(userData));
            // if (userData?.accentColor)
            //     document.documentElement.style.setProperty(
            //         "--MAIN-ACCENT",
            //         userData.accentColor
            //     );
        }
        setToken(userToken);
    };

    return {
        token: token,
        setToken: saveToken,
    };
};
