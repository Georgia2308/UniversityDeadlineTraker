import { useState } from "react";
import { ACCENT_COLOR, setAccentColor } from "./Constants";
import { Permissions } from "./Enums";

export const getToken = () => {
    return sessionStorage.getItem("token");
};

export const getUser = () => {
    return JSON.parse(sessionStorage.getItem("user"));
};

export const useUser = () => {
    const [user, setUser] = useState(getUser());
    setAccentColor();

    const saveUser = (userData) => {
        if (!userData) sessionStorage.removeItem("user");
        else {
            sessionStorage.setItem("user", JSON.stringify(userData));
            setAccentColor();
        }
        setUser(userData);
    };

    return {
        user: user,
        setUser: saveUser,
    };
};

export const useToken = () => {
    const [token, setToken] = useState(getToken());

    const saveToken = (userToken, refreshToken) => {
        if (!userToken) {
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("refreshToken");
        } else {
            sessionStorage.setItem("token", userToken);
            sessionStorage.setItem("refreshToken", refreshToken);
        }
        setToken(userToken);
    };

    return {
        token: token,
        setToken: saveToken,
    };
};

export const getPermissions = () => {
    return getUser().role;
}