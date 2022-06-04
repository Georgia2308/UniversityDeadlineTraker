import { getUser } from "../Utils/Token";

export const DARKEST_GREY = "#131313";
export const DARKER_GREY = "#292929";
export const DARK_GREY = "#343434";
export const LIGHT_GREY = "#454545";
export const LIGHTER_GREY = "#9D9D9D";
export const ACCENT_COLOR = "#ce9aff";
export const RED_ACCENT = "#EA2A3D";

export const getAccentColor = () => {
    return getUser()?.accentColor ?? ACCENT_COLOR;
};
