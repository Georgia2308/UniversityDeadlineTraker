import React, { useEffect, useRef, useState } from "react";
import "./ProfilePage.css";
import { Default } from "../Components/Default";
import { getUser } from "../Utils/Token";
import Avatar from "@mui/material/Avatar";
import { Stack, TextField } from "@mui/material";
import { getUserTasksForUser, updateUser } from "../Utils/Services";

import { getAssignedSubjects, getTeacherforSubject } from "../Utils/Services";

import MailOutlineIcon from "@mui/icons-material/MailOutline";
import CakeIcon from "@mui/icons-material/Cake";
import { LIGHTER_GREY } from "../Utils/Constants";
import { CircularProgress } from "@mui/material";
import StackedLineChartIcon from "@mui/icons-material/StackedLineChart";
import BackupTableIcon from "@mui/icons-material/BackupTable";

import Chart from "../Components/Chart";
import AlertDialogError from "../Components/AlertDialogError";
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
    type: "text",
};

const ProfilePage = (props) => {
    const { token, setToken } = props.token;
    const { user, setUser } = props.user;
    const [isVisible, setIsVisible] = useState(true);
    const [newUser, setNewUser] = useState(user);
    const [userTasks, setUserTasks] = useState(null);
    const [showError, setShowError] = useState(false);
    const [subjects, setSubjects] = React.useState(null);
    const [isNotChart, setIsNotChart] = useState(true);
    const inputFile = useRef(null);

    const onSaveProfile = () => {
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
                    setIsVisible(true);
                } else setShowError(true);
            });
        } else setShowError(true);
    };

    React.useEffect(() => {
        if (!token) return;

        getAssignedSubjects().then((data) => {
            setSubjects(data);
        });

        getUserTasksForUser().then((data) => {
            let groupedTasks = data.reduce(function (r, a) {
                r[a.task.subject.id] = r[a.task.subject.id] || [];
                r[a.task.subject.id].push(a);
                return r;
            }, Object.create(null));
            setUserTasks(groupedTasks);
        });
    }, [token]);

    const onChangeFile = (event) => {
        event.stopPropagation();
        event.preventDefault();
        const file = event.target.files[0];
        setNewUser({ ...newUser, profilePictureURL: file.name });
    };

    const getSubjects = () => {
        return (
            <div>
                {subjects.map((subject) => {
                    const filteredUserTasks = Object.values(userTasks).find(
                        (userTask) => userTask[0].task.subject.id === subject.id
                    );
                    let overallGrade = 0;
                    if (filteredUserTasks)
                        for (var userTask of filteredUserTasks) {
                            overallGrade += userTask.grade;
                        }
                    overallGrade = (
                        overallGrade / filteredUserTasks?.length
                    ).toFixed(2);
                    if (isNaN(overallGrade)) overallGrade = 0;
                    return (
                        <div className="subject">
                            <div className="hor-line"></div>
                            <div className="subject-title">
                                <div className="subject-name">
                                    {subject.name}
                                </div>
                                <div className="subject-teacher">{`(Teacher: ${subject.teacher?.lastName} ${subject.teacher?.firstName})`}</div>
                                <div className="overall">
                                    Overall grade: <span>{overallGrade}</span>
                                </div>
                            </div>

                            <div className="subject-labs">
                                {filteredUserTasks &&
                                    filteredUserTasks.map((userTask) => {
                                        return (
                                            <div className="grades">
                                                {userTask.task.title}
                                                <span>: {userTask.grade}</span>
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <React.Fragment>
            {token ? (
                <Stack direction="row" className="profile-page">
                    {isVisible ? (
                        <div className="left">
                            <Avatar
                                alt="User"
                                className="profile-pic"
                                src={
                                    user && user.profilePictureURL
                                        ? "/" + user.profilePictureURL
                                        : "https://www.pngkey.com/png/full/230-2301779_best-classified-apps-default-user-profile.png"
                                }
                                sx={{ width: 150, height: 150 }}
                            />
                            <span className="infos">
                                <div className="name">
                                    {user.firstName} {user.lastName}
                                </div>
                                <div className="usrname">@{user.username}</div>
                                <div className="hor-line"></div>
                                <div className="info">
                                    <MailOutlineIcon htmlColor="#c9c9c9" />
                                    <div className="text">{user.email}</div>
                                </div>
                                <div className="info">
                                    <CakeIcon htmlColor="#c9c9c9" />
                                    <div className="text">
                                        {new Date(
                                            user.dateOfBirth
                                        ).toDateString()}
                                    </div>
                                </div>
                                {getPermissions() ? (
                                    ""
                                ) : (
                                    <div>
                                        <div className="info">
                                            <span>Code</span>: {user.code}
                                        </div>
                                        <div className="info">
                                            <span>Group</span>: {user.group}
                                        </div>
                                        <div className="info">
                                            <span>Year</span>: {user.year}
                                        </div>
                                    </div>
                                )}
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
                            <div
                                className="avatar"
                                onClick={() => inputFile.current.click()}
                            >
                                <Avatar
                                    alt="User"
                                    className="profile-pic-edit"
                                    src={
                                        newUser && newUser.profilePictureURL
                                            ? "/" + newUser.profilePictureURL
                                            : "https://www.pngkey.com/png/full/230-2301779_best-classified-apps-default-user-profile.png"
                                    }
                                    sx={{ width: 150, height: 150 }}
                                />
                                <div className="change">
                                    Change profile picture
                                </div>
                                <input
                                    type="file"
                                    id="file"
                                    ref={inputFile}
                                    style={{ display: "none" }}
                                    onChange={onChangeFile.bind(this)}
                                />
                            </div>
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
                                    {...genericProps}
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
                                    {...genericProps}
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
                                    {...genericProps}
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
                                    {...genericProps}
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
                                            {...genericProps}
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
                                            {...genericProps}
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
                                            {...genericProps}
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
                            <div className="infos">
                                <div className="button" onClick={onSaveProfile}>
                                    Save changes
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="right">
                        {getPermissions() ? (
                            <div className="chart">
                                <div className="title">
                                    Grades and progress to each of your subject over the years:
                                </div>
                                {/* <Chart
                                    data={[].concat
                                        .apply(
                                            [],
                                            Object.values(userTasks).map(
                                                (subjectUserTasks) => {
                                                    return subjectUserTasks.map(
                                                        (userTask) => ({
                                                            name: new Date(
                                                                userTask.task.deadline
                                                            ).toDateString(),
                                                            [userTask.task
                                                                .subject.name]:
                                                                userTask.grade,
                                                        })
                                                    );
                                                }
                                            )
                                        )
                                        .sort((a, b) => {
                                            return (
                                                Date.parse(a.name) -
                                                Date.parse(b.name)
                                            );
                                        })}
                                    lines={Object.values(userTasks).map(
                                        (subjectUserTasks) => {
                                            return subjectUserTasks[0].task
                                                .subject.name;
                                        }
                                    )}
                                /> */}
                            </div>
                        ) : isNotChart ? (
                            <div>
                                <StackedLineChartIcon
                                    className="icon"
                                    onClick={() => {
                                        setIsNotChart(false);
                                    }}
                                />
                                <div className="title">
                                    Your grades and progress:
                                </div>

                                {subjects && userTasks ? (
                                    getSubjects()
                                ) : (
                                    <div className="board-spinner">
                                        <CircularProgress color="inherit" />
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="chart">
                                <BackupTableIcon
                                    className="icon"
                                    onClick={() => {
                                        setIsNotChart(true);
                                    }}
                                />
                                <div className="title">
                                    Your grades and progress:
                                </div>
                                <Chart
                                    data={[].concat
                                        .apply(
                                            [],
                                            Object.values(userTasks).map(
                                                (subjectUserTasks) => {
                                                    return subjectUserTasks.map(
                                                        (userTask) => ({
                                                            name: new Date(
                                                                userTask.task.deadline
                                                            ).toDateString(),
                                                            [userTask.task
                                                                .subject.name]:
                                                                userTask.grade,
                                                        })
                                                    );
                                                }
                                            )
                                        )
                                        .sort((a, b) => {
                                            return (
                                                Date.parse(a.name) -
                                                Date.parse(b.name)
                                            );
                                        })}
                                    lines={Object.values(userTasks).map(
                                        (subjectUserTasks) => {
                                            return subjectUserTasks[0].task
                                                .subject.name;
                                        }
                                    )}
                                />
                            </div>
                        )}
                    </div>
                    <AlertDialogError
                        open={showError}
                        setOpen={setShowError}
                        label="Please try again"
                    />
                </Stack>
            ) : (
                <Default />
            )}
        </React.Fragment>
    );
};

export default ProfilePage;
