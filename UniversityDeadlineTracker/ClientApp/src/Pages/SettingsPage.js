import React, { useEffect, useRef, useState } from "react";
import "./SettingsPage.css";

import { getUser } from "../Utils/Token";
import Avatar from "@mui/material/Avatar";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import SettingsIcon from "@mui/icons-material/Settings";
import EditNotificationsIcon from "@mui/icons-material/EditNotifications";
import BrushIcon from "@mui/icons-material/Brush";
import EditIcon from "@mui/icons-material/Edit";

import { updateUser, deleteUser } from "../Utils/Services";
import { Stack, TextField } from "@mui/material";
import {
    LIGHTER_GREY,
    LIGHT_GREY,
    DARK_GREY,
    ACCENT_COLOR,
} from "../Utils/Constants";
import AlertDialog from "../Components/AlertDialog";
import AlertDialogError from "../Components/AlertDialogError";
import { getAccentColor } from "../Utils/Constants";

import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { HexColorPicker } from "react-colorful";
import AlertDialogConfirm from "../Components/AlertDialogConfirm";

import { useHistory, useLocation } from "react-router-dom";
import { Pages } from "../Utils/Enums";
import { getPermissions } from "../Utils/Token";

const isUserValid = (user) => {
    return (
        user.username?.length > 0 &&
        user.password?.length > 0 &&
        user.firstName?.length > 0 &&
        user.lastName?.length > 0 &&
        user.email?.length > 0 &&
        user.group?.length > 0 &&
        user.year?.length > 0 &&
        user.code?.length > 0 &&
        user.profilePictureURL?.length > 0 &&
        user.dateOfBirth?.length > 0 &&
        !isNaN(user?.group) &&
        !isNaN(user?.year) &&
        !isNaN(user?.code)
    );
};
const genericProps = {
    required: false,
    variant: "filled",
    className: "textfield",
    sx: {
        input: {
            color: "white",
        },
    },
    InputLabelProps: {
        style: {
            color: LIGHTER_GREY,
        },
    },
};

const genericTextProps = { ...genericProps, type: "text" };

const genericPasswordProps = { ...genericProps, type: "password" };

const SettingsPage = (props) => {
    const { token, setToken } = props.token;
    const { user, setUser } = props.user;
    const [newUser, setNewUser] = useState(user);
    const [checked, setChecked] = React.useState([true, false]);
    const [color, setColor] = useState(getAccentColor());

    const [currentTab, setCurrentTab] = useState(0);

    const [showError, setShowError] = useState(false);
    const [showConfirmProfile, setShowConfirmProfile] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showConfirmDeleteAcc, setShowConfirmDeleteAcc] = useState(false);

    const [showConfirmTheme, setShowConfirmTheme] = useState(false);
    const [showConfirmReset, setShowConfirmReset] = useState(false);
    const [showConfirmAccent, setShowConfirmAccent] = useState(false);
    const inputFile = useRef(null);
    let history = useHistory();

    const onConfirmDelete = () => {
        deleteUser(newUser.id).then((response) => {
            if (response.status === 200) {
                props.setToken(null, null);
                props.setUser(null);
                history.push(Pages.HOME);
            } else setShowError(true);
        });
    };

    const saveProfileSettings = () => {
        if (isUserValid(newUser)) {
            const saveData = {
                ...newUser,
                group: Number.parseInt(newUser.group),
                year: Number.parseInt(newUser.year),
                code: Number.parseInt(newUser.code),
            };
            updateUser(saveData).then((response) => {
                if (response.status === 200) {
                    setUser(saveData);
                    setShowConfirmProfile(true);
                } else setShowError(true);
            });
        } else setShowError(true);
    };

    const getTabStyle = (tab) => {
        return {
            backgroundColor: currentTab == tab ? LIGHT_GREY : DARK_GREY,
            borderRadius: "10px",
        };
    };
    const onChangeFile = (event) => {
        event.stopPropagation();
        event.preventDefault();
        const file = event.target.files[0];
        setNewUser({ ...newUser, profilePictureURL: file.name });
    };
    const handleChange1 = (event) => {
        setChecked([event.target.checked, event.target.checked]);
    };
    const handleChange2 = (event) => {
        setChecked([event.target.checked, checked[1]]);
    };
    const handleChange3 = (event) => {
        setChecked([checked[0], event.target.checked]);
    };
    const children = (
        <Box sx={{ display: "flex", flexDirection: "column", ml: 3 }}>
            {getPermissions() ? (
                <Stack>
                    <FormControlLabel
                        label="New student enroled to one of your subjects"
                        control={
                            <Checkbox
                                checked={checked[0]}
                                onChange={handleChange2}
                                sx={{
                                    color: getAccentColor(),
                                    "&.Mui-checked": {
                                        color: getAccentColor(),
                                    },
                                }}
                            />
                        }
                    />
                    <FormControlLabel
                        label="Student contacted you via email"
                        control={
                            <Checkbox
                                checked={checked[1]}
                                onChange={handleChange3}
                                sx={{
                                    color: getAccentColor(),
                                    "&.Mui-checked": {
                                        color: getAccentColor(),
                                    },
                                }}
                            />
                        }
                    />
                </Stack>
            ) : (
                <Stack>
                    <FormControlLabel
                        label="New Task"
                        control={
                            <Checkbox
                                checked={checked[0]}
                                onChange={handleChange2}
                                sx={{
                                    color: getAccentColor(),
                                    "&.Mui-checked": {
                                        color: getAccentColor(),
                                    },
                                }}
                            />
                        }
                    />
                    <FormControlLabel
                        label="Task Graded"
                        control={
                            <Checkbox
                                checked={checked[1]}
                                onChange={handleChange3}
                                sx={{
                                    color: getAccentColor(),
                                    "&.Mui-checked": {
                                        color: getAccentColor(),
                                    },
                                }}
                            />
                        }
                    />
                </Stack>
            )}
        </Box>
    );
    const getPreview = (previewColor) => {
        return (
            <div className="preview">
                <div className="header">
                    <div
                        className="logo"
                        style={{ "background-color": previewColor }}
                    ></div>
                    <div className="tab"></div>
                    <div className="tab"></div>
                    <div className="tab"></div>
                    <div className="pic"></div>
                </div>
                <div className="body">
                    <div className="content">
                        <div className="prev-left">
                            <div className="content-text"></div>
                            <div className="content-text"></div>
                            <div className="content-text"></div>
                        </div>
                        <div className="prev-right">
                            <div
                                className="content-text"
                                style={{ "background-color": previewColor }}
                            ></div>
                            <div className="content-text"></div>
                            <div className="content-text"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
    return (
        <div className="settings-page">
            <div className="left">
                <div className="infos">
                    <Avatar
                        alt="User"
                        className="profile-pic"
                        src={
                            user?.profilePictureURL
                                ? "/" + user?.profilePictureURL
                                : "https://www.pngkey.com/png/full/230-2301779_best-classified-apps-default-user-profile.png"
                        }
                        sx={{ width: 60, height: 60 }}
                    />
                    <div className="names">
                        <div className="name">
                            {user?.firstName} {user?.lastName}
                        </div>
                        <div className="usrname">@{user?.username}</div>
                    </div>
                </div>
                <div className="hor-line"></div>
                <div
                    className="setting"
                    onClick={() => setCurrentTab(0)}
                    style={getTabStyle(0)}
                >
                    <ManageAccountsIcon htmlColor="#c9c9c9" className="icon" />
                    <div className="text">General</div>
                </div>
                <div
                    className="setting"
                    onClick={() => setCurrentTab(1)}
                    style={getTabStyle(1)}
                >
                    <SettingsIcon htmlColor="#c9c9c9" className="icon" />
                    <div className="text">Account</div>
                </div>
                <div
                    className="setting"
                    onClick={() => setCurrentTab(2)}
                    style={getTabStyle(2)}
                >
                    <EditNotificationsIcon
                        htmlColor="#c9c9c9"
                        className="icon"
                    />
                    <div className="text">Notifications</div>
                </div>
                <div
                    className="setting"
                    onClick={() => setCurrentTab(3)}
                    style={getTabStyle(3)}
                >
                    <BrushIcon htmlColor="#c9c9c9" className="icon" />
                    <div className="text">Appearance</div>
                </div>
            </div>
            <div className="right">
                {currentTab == 0 && (
                    <div className="general">
                        <div className="title">Profile</div>
                        <div className="hor-line"></div>
                        <div className="general-components">
                            <Stack
                                direction="column"
                                spacing={1}
                                className="stack"
                            >
                                <TextField
                                    label="First Name"
                                    error={newUser.firstName === ""}
                                    defaultValue={user.firstName}
                                    autofocus
                                    {...genericTextProps}
                                    onChange={(event) => {
                                        setNewUser({
                                            ...newUser,
                                            firstName: event.target.value,
                                        });
                                    }}
                                />
                                <TextField
                                    label="Last Name"
                                    error={newUser.lastName === ""}
                                    defaultValue={user.lastName}
                                    {...genericTextProps}
                                    onChange={(event) => {
                                        setNewUser({
                                            ...newUser,
                                            lastName: event.target.value,
                                        });
                                    }}
                                />
                                <TextField
                                    label="Username"
                                    error={newUser.username === ""}
                                    defaultValue={user.username}
                                    {...genericTextProps}
                                    onChange={(event) => {
                                        setNewUser({
                                            ...newUser,
                                            username: event.target.value,
                                        });
                                    }}
                                />
                                <TextField
                                    label="Email"
                                    error={newUser.email === ""}
                                    InputLabelProps={{
                                        style: {
                                            color: LIGHTER_GREY,
                                        },
                                    }}
                                    defaultValue={user.email}
                                    {...genericTextProps}
                                    onChange={(event) => {
                                        setNewUser({
                                            ...newUser,
                                            email: event.target.value,
                                        });
                                    }}
                                />
                                {getPermissions() ? (
                                    ""
                                ) : (
                                    <Stack>
                                        <TextField
                                            label="Code"
                                            error={
                                                newUser.code === "" ||
                                                isNaN(newUser.code)
                                            }
                                            defaultValue={user.code}
                                            {...genericTextProps}
                                            onChange={(event) => {
                                                setNewUser({
                                                    ...newUser,
                                                    code: event.target.value,
                                                });
                                            }}
                                        />
                                        <TextField
                                            label="Group"
                                            error={
                                                newUser.group === "" ||
                                                isNaN(newUser.group)
                                            }
                                            defaultValue={user.group}
                                            {...genericTextProps}
                                            onChange={(event) => {
                                                setNewUser({
                                                    ...newUser,
                                                    group: event.target.value,
                                                });
                                            }}
                                        />
                                        <TextField
                                            label="Year"
                                            error={
                                                newUser.year === "" ||
                                                isNaN(newUser.year)
                                            }
                                            defaultValue={user.year}
                                            {...genericTextProps}
                                            onChange={(event) => {
                                                setNewUser({
                                                    ...newUser,
                                                    year: event.target.value,
                                                });
                                            }}
                                        />
                                    </Stack>
                                )}
                            </Stack>
                            <Stack>
                                <div className="change-text">
                                    Profile picture
                                </div>
                                <div
                                    className="avatar"
                                    onClick={() => inputFile.current.click()}
                                >
                                    <Avatar
                                        alt="User"
                                        className="profile-pic-edit"
                                        src={
                                            newUser.profilePictureURL
                                                ? "/" +
                                                  newUser?.profilePictureURL
                                                : "https://www.pngkey.com/png/full/230-2301779_best-classified-apps-default-user-profile.png"
                                        }
                                        sx={{ width: 150, height: 150 }}
                                    />
                                    <div className="change">
                                        {" "}
                                        <EditIcon />
                                        Edit
                                    </div>
                                    <input
                                        type="file"
                                        id="file"
                                        ref={inputFile}
                                        style={{ display: "none" }}
                                        onChange={onChangeFile.bind(this)}
                                    />
                                </div>
                            </Stack>
                        </div>
                        <div className="button" onClick={saveProfileSettings}>
                            Save changes
                        </div>
                    </div>
                )}
                {currentTab == 1 && (
                    <div className="account">
                        <div className="title">Change Password</div>
                        <div className="hor-line"></div>
                        <Stack direction="column" spacing={1} className="stack">
                            <TextField
                                label="Old Password"
                                type="password"
                                {...genericPasswordProps}
                                // onChange={(event) => {
                                //     setUser({
                                //         ...user,
                                //         firstName: event.target.value,
                                //     });
                                // }}
                            />
                            <TextField
                                label="New Password"
                                type="password"
                                {...genericPasswordProps}
                                // onChange={(event) => {
                                //     setUser({
                                //         ...user,
                                //         lastName: event.target.value,
                                //     });
                                // }}
                            />
                            <TextField
                                label="Confirm New Password"
                                type="password"
                                {...genericPasswordProps}
                                // onChange={(event) => {
                                //     setUser({
                                //         ...user,
                                //         username: event.target.value,
                                //     });
                                // }}
                            />
                        </Stack>
                        <div
                            className="button"
                            onClick={() => {
                                //     updateUser(user).then((response) => {
                                //         if (response.status === 200) {
                                //             sessionStorage.setItem(
                                //                 "user",
                                //                 JSON.stringify(user)
                                //             );
                                //         setShowConfirmPassword(true);
                                //         } else
                                //         setShowError(true);
                                //     });
                                if (true) {
                                    setShowConfirmPassword(true);
                                } else setShowError(true);
                            }}
                        >
                            Update Password
                        </div>
                        <div className="title-delete">Delete account</div>
                        <div className="hor-line"></div>

                        <div className="delete-text">
                            Once you delete your account, there is no going
                            back. Please be certain.
                        </div>
                        <div
                            className="button-delete"
                            onClick={() => {
                                setShowConfirmDeleteAcc(true);
                            }}
                        >
                            Delete your account
                        </div>
                    </div>
                )}
                {currentTab == 2 && (
                    <div className="notifications">
                        <div className="title">
                            Email notification preferences
                        </div>
                        <div className="hor-line"></div>
                        <div className="check-boxes">
                            <FormControlLabel
                                label="All"
                                control={
                                    <Checkbox
                                        sx={{
                                            color: getAccentColor(),
                                            "&.Mui-checked": {
                                                color: getAccentColor(),
                                            },
                                        }}
                                        checked={checked[0] && checked[1]}
                                        indeterminate={
                                            checked[0] !== checked[1]
                                        }
                                        onChange={handleChange1}
                                    />
                                }
                            />
                            {children}
                        </div>
                    </div>
                )}
                {currentTab == 3 && (
                    <div className="appearance">
                        <div className="title">Theme preferences</div>
                        <div className="hor-line"></div>
                        <FormControl>
                            <FormLabel id="demo-radio-buttons-group-label">
                                Choose how OrganiseIT looks to you by selecting
                                a theme.
                            </FormLabel>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="dark"
                                name="radio-buttons-group"
                            >
                                <div className="option-dark">
                                    {getPreview(getAccentColor())}
                                    <FormControlLabel
                                        value="dark"
                                        control={
                                            <Radio
                                                sx={{
                                                    color: LIGHTER_GREY,
                                                    "&.Mui-checked": {
                                                        color: getAccentColor(),
                                                    },
                                                }}
                                            />
                                        }
                                        label="Dark"
                                    />
                                </div>
                                <div className="option-light">
                                    {getPreview(getAccentColor())}
                                    <FormControlLabel
                                        value="light"
                                        control={
                                            <Radio
                                                sx={{
                                                    color: LIGHTER_GREY,
                                                    "&.Mui-checked": {
                                                        color: getAccentColor(),
                                                    },
                                                }}
                                            />
                                        }
                                        label="Light"
                                    />
                                </div>
                            </RadioGroup>
                            <div
                                className="button-theme"
                                onClick={() => {
                                    setShowConfirmTheme(true);
                                }}
                            >
                                Save theme
                            </div>
                        </FormControl>
                        <div className="title">Accent color</div>
                        <div className="hor-line"></div>
                        <div className="accent">
                            Choose the accent color of your app.
                        </div>
                        <Stack
                            direction="row"
                            spacing={5}
                            className="color-stack"
                        >
                            <HexColorPicker
                                color={color}
                                onChange={(newColor) => {
                                    setColor(newColor);
                                    setNewUser({
                                        ...newUser,
                                        accentColor: newColor,
                                    });
                                }}
                            />
                            <div
                                className="button-reset"
                                onClick={() => {
                                    const resetUser = {
                                        ...newUser,
                                        accentColor: null,
                                    };
                                    setNewUser(resetUser);
                                    updateUser(resetUser).then((response) => {
                                        if (response.status === 200) {
                                            setUser(resetUser);
                                            setShowConfirmReset(true);
                                            setColor(ACCENT_COLOR);
                                        } else setShowError(true);
                                    });
                                }}
                            >
                                Reset accent color to default
                            </div>
                        </Stack>
                        <Stack direction="row" spacing={3}>
                            <div className="option-dark">
                                {getPreview(color)}
                                <div className="prev-text">
                                    Preview for dark mode
                                </div>
                            </div>
                            <div className="option-light">
                                {getPreview(color)}
                                <div className="prev-text">
                                    Preview for light mode
                                </div>
                            </div>
                        </Stack>
                        <div
                            className="button-accent"
                            onClick={() => {
                                updateUser(newUser).then((response) => {
                                    if (response.status === 200) {
                                        setUser(newUser);
                                        setShowConfirmAccent(true);
                                    } else setShowError(true);
                                });
                            }}
                        >
                            Save accent color
                        </div>
                    </div>
                )}
            </div>
            <AlertDialogError
                open={showError}
                setOpen={setShowError}
                label="Please try again"
            />
            <AlertDialog
                open={showConfirmProfile}
                setOpen={setShowConfirmProfile}
                label="Changes saved succesfully"
            />
            <AlertDialog
                open={showConfirmPassword}
                setOpen={setShowConfirmPassword}
                label="Password changed succesfully"
            />
            <AlertDialogConfirm
                open={showConfirmDeleteAcc}
                setOpen={setShowConfirmDeleteAcc}
                label="Your account will be deleted"
                onConfirm={onConfirmDelete}
            />
            <AlertDialog
                open={showConfirmTheme}
                setOpen={setShowConfirmTheme}
                label="Theme saved succesfully"
            />
            <AlertDialog
                open={showConfirmReset}
                setOpen={setShowConfirmReset}
                label="Accent color reseted succesfully"
            />
            <AlertDialog
                open={showConfirmAccent}
                setOpen={setShowConfirmAccent}
                label="Accent color saved succesfully"
            />
            ;
        </div>
    );
};

export default SettingsPage;
