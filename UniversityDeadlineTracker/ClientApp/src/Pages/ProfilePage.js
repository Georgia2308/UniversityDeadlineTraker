import React, { useEffect, useState } from "react";
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

const ProfilePage = (props) => {
    const [isVisible, setIsVisible] = useState(true);
    const [user, setUser] = useState(getUser());
    const [userTasks, setUserTasks] = useState(null);
    const genericProps = {
        required: false,
        variant: "filled",
        className: "textfield",
    };

    const [subjects, setSubjects] = React.useState(null);

    const [isNotChart, setIsNotChart] = useState(true);

    React.useEffect(() => {
        if (!props.token) return;

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
    }, [props.token]);

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
                                    onChange={(event) => {
                                        setUser({
                                            ...user,
                                            lastName: event.target.value,
                                        });
                                    }}
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
                                    onChange={(event) => {
                                        setUser({
                                            ...user,
                                            username: event.target.value,
                                        });
                                    }}
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
                                    onChange={(event) => {
                                        setUser({
                                            ...user,
                                            email: event.target.value,
                                        });
                                    }}
                                />
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
                                    onChange={(event) => {
                                        setUser({
                                            ...user,
                                            code: Number.parseInt(
                                                event.target.value
                                            ),
                                        });
                                    }}
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
                                    onChange={(event) => {
                                        setUser({
                                            ...user,
                                            group: Number.parseInt(
                                                event.target.value
                                            ),
                                        });
                                    }}
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
                                    onChange={(event) => {
                                        setUser({
                                            ...user,
                                            year: Number.parseInt(
                                                event.target.value
                                            ),
                                        });
                                    }}
                                />
                            </Stack>
                            <div className="infos">
                                <div
                                    className="button"
                                    onClick={() => {
                                        updateUser(user).then((response) => {
                                            if (response.status === 200) {
                                                sessionStorage.setItem(
                                                    "user",
                                                    JSON.stringify(user)
                                                );
                                                setIsVisible(true);
                                            } else alert(response);
                                        });
                                    }}
                                >
                                    Save changes
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="right">
                        {isNotChart ? (
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
                </Stack>
            ) : (
                <Default />
            )}
        </React.Fragment>
    );
};

export default ProfilePage;
