import React from "react";
import "./LoginPage.css";
import { Pages, SubjectType } from "../Utils/Enums";
import { useHistory } from "react-router-dom";
import {
    enrollUserToSubject,
    getUnassignedSubjects,
    getTeacherforSubject,
} from "../Utils/Services";
import { CircularProgress } from "@mui/material";
import { Default } from "../Components/Default";
import { Login } from "../Components/Login";
import { getUser } from "../Utils/Token";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { LIGHTER_GREY, getAccentColor } from "../Utils/Constants";

export const LoginPage = (props) => {
    const { token, setToken } = props.token;
    const { user, setUser } = props.user;
    let history = useHistory();
    const [subjects, setSubjects] = React.useState(null);

    React.useEffect(() => {
        if (!token) return;

        getUnassignedSubjects().then((data) => {
            setSubjects(data);
        });
    }, [token]);

    const getSubjectButtons = () => {
        return (
            <TransitionGroup>
                {subjects?.map((subject) => {
                    return (
                        <CSSTransition
                            key={subject.id}
                            timeout={450}
                            classNames="subject-transition"
                        >
                            <div
                                className="subject"
                                onClick={() => {
                                    enrollUserToSubject(subject.id).then(
                                        (r) => {
                                            setSubjects(
                                                subjects.filter(
                                                    (s) => s.id !== subject.id
                                                )
                                            );
                                        }
                                    );
                                }}
                            >
                                <div
                                    className="subject-year"
                                    style={{
                                        backgroundColor:
                                            subject.type ===
                                            SubjectType.OBLIGATORIU
                                                ? getAccentColor()
                                                : LIGHTER_GREY,
                                    }}
                                >
                                    y{subject.year}
                                </div>
                                <div className="subject-name">
                                    {subject.name}
                                </div>
                                <div className="subject-teacher">{`Teacher: ${subject.teacher?.lastName} ${subject.teacher?.firstName}`}</div>
                            </div>
                        </CSSTransition>
                    );
                })}
            </TransitionGroup>
        );
    };

    return (
        <React.Fragment>
            {user ? (
                <div className="login-page">
                    <p className="hello">
                        Hello{" "}
                        <span className="orange">{user?.username}</span>!
                    </p>
                    <p>
                        Welcome back to your University Task Management System!
                    </p>
                    <div
                        className="button"
                        onClick={() => history.push(Pages.BOARD)}
                    >
                        Check your Boards!
                    </div>
                    <p className="enroll">
                        Enroll to subjects to stay up to date with upcoming
                        tasks!
                    </p>
                    <div className="subject-board">
                        <div className="filter" />
                        {subjects ? (
                            getSubjectButtons()
                        ) : (
                            <div className="board-spinner">
                                <CircularProgress color="inherit" />
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <React.Fragment>
                    <Default main />
                    <Login token={token} setToken={setToken} user={user} setUser={setUser} />
                </React.Fragment>
            )}
        </React.Fragment>
    );
};
export default LoginPage;
