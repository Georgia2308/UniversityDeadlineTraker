import React, { useEffect, useState } from "react";
import "./ProfilePage.css";
import { Default } from "../Components/Default";
import { getUser } from "../Utils/Token";
import Avatar from "@mui/material/Avatar";
import { Stack, TextField } from "@mui/material";
import { updateUser } from "../Utils/Services";

import MailOutlineIcon from "@mui/icons-material/MailOutline";
import CakeIcon from "@mui/icons-material/Cake";
import { LIGHTER_GREY } from "../Utils/Constants";

const ProfilePage = (props) => {
    const [isVisible, setIsVisible] = useState(true);
    const [user, setUser] = useState(getUser());
    const genericProps = {
        required: false,
        variant: "filled",
        className: "textfield",
    };

    return (
        <React.Fragment>
            {props.token ? (
                <Stack direction="row" className="profile-page">
                    {isVisible ? (
                        <div className="left">
                            <Avatar
                                alt="User"
                                className="profile-pic"
                                src={
                                    props.token && getUser().profilePictureURL
                                        ? "/" + getUser().profilePictureURL
                                        : "https://www.pngkey.com/png/full/230-2301779_best-classified-apps-default-user-profile.png"
                                }
                                sx={{ width: 150, height: 150 }}
                            />
                            <span className="infos">
                                <div className="name">
                                    {getUser().firstName} {getUser().lastName}
                                </div>
                                <div className="usrname">
                                    @{getUser().username}
                                </div>
                                <div className="hor-line"></div>
                                <div className="info">
                                    <MailOutlineIcon htmlColor="#c9c9c9" />
                                    <div className="text">
                                        {getUser().email}
                                    </div>
                                </div>
                                <div className="info">
                                    <CakeIcon htmlColor="#c9c9c9" />
                                    <div className="text">
                                        {new Date(
                                            getUser().dateOfBirth
                                        ).toDateString()}
                                    </div>
                                </div>
                                <div className="info">
                                    <span>Code</span>: {getUser().code}
                                </div>
                                <div className="info">
                                    <span>Group</span>: {getUser().group}
                                </div>
                                <div className="info">
                                    <span>Year</span>: {getUser().year}
                                </div>
                                <div
                                    className="button"
                                    onClick={() => {
                                        setIsVisible(false);
                                    }}
                                >
                                    Edit profile
                                </div>
                            </span>
                        </div>
                    ) : (
                        <div className="left">
                            <div className="avatar" onClick={() => true}>
                                <Avatar
                                    alt="User"
                                    className="profile-pic-edit"
                                    src={
                                        props.token &&
                                        getUser().profilePictureURL
                                            ? "/" + getUser().profilePictureURL
                                            : "https://www.pngkey.com/png/full/230-2301779_best-classified-apps-default-user-profile.png"
                                    }
                                    sx={{ width: 150, height: 150 }}
                                />
                                <div className="change">
                                    Change profile picture
                                </div>
                            </div>
                            <Stack
                                direction="column"
                                spacing={1}
                                className="stack"
                            >
                                <TextField
                                    sx={{
                                        input: {
                                            color: "white",
                                        },
                                    }}
                                    label="First Name"
                                    InputProps={{ disableUnderline: true }}
                                    InputLabelProps={{
                                        style: {
                                            color: LIGHTER_GREY,
                                        },
                                    }}
                                    type="text"
                                    defaultValue={getUser().firstName}
                                    autofocus
                                    {...genericProps}
                                    onChange={(event) => {
                                        setUser({
                                            ...user,
                                            firstName: event.target.value,
                                        });
                                    }}
                                />
                                <TextField
                                    sx={{
                                        input: {
                                            color: "white",
                                        },
                                    }}
                                    label="Last Name"
                                    InputProps={{ disableUnderline: true }}
                                    InputLabelProps={{
                                        style: {
                                            color: LIGHTER_GREY,
                                        },
                                    }}
                                    type="text"
                                    defaultValue={getUser().lastName}
                                    autofocus
                                    {...genericProps}
                                    // onChange={(event) => {
                                    //     setUser({
                                    //         ...user,
                                    //         username: event.target.value,
                                    //     });
                                    // }}
                                />
                                <TextField
                                    sx={{
                                        input: {
                                            color: "white",
                                        },
                                    }}
                                    label="Username"
                                    InputProps={{ disableUnderline: true }}
                                    InputLabelProps={{
                                        style: {
                                            color: LIGHTER_GREY,
                                        },
                                    }}
                                    type="text"
                                    defaultValue={getUser().username}
                                    autofocus
                                    {...genericProps}
                                    // onChange={(event) => {
                                    //     setUser({
                                    //         ...user,
                                    //         username: event.target.value,
                                    //     });
                                    // }}
                                />
                                <TextField
                                    sx={{
                                        input: {
                                            color: "white",
                                        },
                                    }}
                                    label="Email"
                                    InputProps={{ disableUnderline: true }}
                                    InputLabelProps={{
                                        style: {
                                            color: LIGHTER_GREY,
                                        },
                                    }}
                                    type="text"
                                    defaultValue={getUser().email}
                                    autofocus
                                    {...genericProps}
                                    // onChange={(event) => {
                                    //     setUser({
                                    //         ...user,
                                    //         username: event.target.value,
                                    //     });
                                    // }}
                                />
                                {/* <TextField
                                    sx={{
                                        input: {
                                            color: "white",
                                        },
                                    }}
                                    label="Birthday"
                                    InputProps={{ disableUnderline: true }}
                                    InputLabelProps={{
                                        style: {
                                            color: LIGHTER_GREY,
                                        },
                                    }}
                                    type="date"
                                    defaultValue={getUser().dateOfBirth}
                                    autofocus
                                    {...genericProps}
                                    // onChange={(event) => {
                                    //     setUser({
                                    //         ...user,
                                    //         username: event.target.value,
                                    //     });
                                    // }}
                                /> */}
                                <TextField
                                    sx={{
                                        input: {
                                            color: "white",
                                        },
                                    }}
                                    label="Code"
                                    InputProps={{ disableUnderline: true }}
                                    InputLabelProps={{
                                        style: {
                                            color: LIGHTER_GREY,
                                        },
                                    }}
                                    type="text"
                                    defaultValue={getUser().code}
                                    autofocus
                                    {...genericProps}
                                    // onChange={(event) => {
                                    //     setUser({
                                    //         ...user,
                                    //         username: event.target.value,
                                    //     });
                                    // }}
                                />
                                <TextField
                                    sx={{
                                        input: {
                                            color: "white",
                                        },
                                    }}
                                    label="Group"
                                    InputProps={{ disableUnderline: true }}
                                    InputLabelProps={{
                                        style: {
                                            color: LIGHTER_GREY,
                                        },
                                    }}
                                    type="text"
                                    defaultValue={getUser().group}
                                    autofocus
                                    {...genericProps}
                                    // onChange={(event) => {
                                    //     setUser({
                                    //         ...user,
                                    //         username: event.target.value,
                                    //     });
                                    // }}
                                />
                                <TextField
                                    sx={{
                                        input: {
                                            color: "white",
                                        },
                                    }}
                                    label="Year"
                                    InputProps={{ disableUnderline: true }}
                                    InputLabelProps={{
                                        style: {
                                            color: LIGHTER_GREY,
                                        },
                                    }}
                                    type="text"
                                    defaultValue={getUser().year}
                                    autofocus
                                    {...genericProps}
                                    // onChange={(event) => {
                                    //     setUser({
                                    //         ...user,
                                    //         username: event.target.value,
                                    //     });
                                    // }}
                                />
                            </Stack>
                            <div className="infos">
                                <div
                                    className="button"
                                    onClick={() => {
                                        updateUser({
                                            ...user,
                                            subjects: [],
                                        }).then((response) => {
                                            if (response.status === 200)
                                                setIsVisible(true);
                                            else alert(response);
                                        });
                                    }}
                                >
                                    Save changes
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="right"></div>
                </Stack>
            ) : (
                <Default />
            )}
        </React.Fragment>
    );
};

export default ProfilePage;
