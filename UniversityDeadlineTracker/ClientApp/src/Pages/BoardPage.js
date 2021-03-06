import React, { useEffect, useState } from "react";
import "./BoardPage.css";
import { getUserTasksForUser } from "../Utils/Services";
import { CircularProgress } from "@mui/material";
import SimpleSlider from "../Components/Slider";
import { Default } from "../Components/Default";

export const BoardPage = (props) => {
    const { token, setToken } = props.token;
    const { user, setUser } = props.user;
    const [tasks, setTasks] = useState(null);
    const [initialSlide, setInitialSlide] = useState(null);
    const [shouldRefreshSlider, setShouldRefreshSlider] = useState(false);

    useEffect(() => {
        if (!token) return;

        getUserTasksForUser().then((data) => {
            let groupedTasks = data.reduce(function (r, a) {
                r[a.task.deadline] = r[a.task.deadline] || [];
                r[a.task.deadline].push(a);
                return r;
            }, Object.create(null));

            setTasks(
                Object.values(groupedTasks).sort((a, b) => {
                    return (
                        new Date(a[0].task.deadline) -
                        new Date(b[0].task.deadline)
                    );
                })
            );
        });
    }, [token, shouldRefreshSlider]);

    useEffect(() => {
        if (!tasks) return;

        for (let i = 0; i < tasks?.length; i++) {
            if (new Date(tasks[i][0].task.deadline) >= Date.now()) {
                setInitialSlide(i);
                return;
            }
        }
        setInitialSlide(0);
    }, [tasks]);

    return (
        <React.Fragment>
            {token ? (
                initialSlide !== null ? (
                    <div className="board-page">
                        <SimpleSlider
                            token={props.token}
                            user={props.user}
                            tasks={tasks}
                            initialSlide={initialSlide}
                            refreshSlider={{
                                shouldRefreshSlider: shouldRefreshSlider,
                                setShouldRefreshSlider: setShouldRefreshSlider,
                            }}
                        />
                    </div>
                ) : (
                    <div className="board-spinner">
                        <CircularProgress color="inherit" />
                    </div>
                )
            ) : (
                <Default />
            )}
        </React.Fragment>
    );
};
