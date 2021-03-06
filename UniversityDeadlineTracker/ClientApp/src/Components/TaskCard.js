import React, { useEffect, useState } from "react";
import "./TaskCard.css";
import { updateUserTask } from "../Utils/Services";
import { Status } from "../Utils/Enums";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { DARK_GREY, DARKER_GREY, LIGHTER_GREY } from "../Utils/Constants";
import { Stack } from "@mui/material";
import Popup from "../Components/Popup";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";

export const TaskCard = (props) => {
    const [status, setStatus] = React.useState(props.item.status);
    const [showPopup, setShowPopup] = useState(false);

    React.useEffect(() => {
        setStatus(props.item.status);
    }, [props.item.status]);

    const handleChange = (event) => {
        updateUserTask({
            ...props.item,
            task: null,
            status: event.target.checked ? Status.COMPLETED : Status.NEW,
        }).then((r) => {});
        setStatus(event.target.checked ? Status.COMPLETED : Status.NEW);
    };

    const getSubjectColor = (subject) => {
        const number = subject % 6;
        switch (number) {
            case 0:
                return "#a56d24";
            case 1:
                return "#6b3b48";
            case 2:
                return "#626327";
            case 3:
                return "#2d5b6b";
            case 4:
                return "#8f4731";
            case 5:
                return "#52494c";
        }
    };

    return (
        <Card>
            <CardContent>
                <div className="card-component">
                    <div className="cardheader">
                        <div
                            align="left"
                            className="subject-dot"
                            style={{
                                backgroundColor: getSubjectColor(
                                    props.item.task.subject.id
                                ),
                            }}
                        >
                            {props.item.task.subject.name}
                        </div>
                        <Stack>
                            <div className="card-titlee">
                                {props.item.task.title}
                            </div>
                            <div className="card-subtitle">
                                {props.item.task.subtitle}
                            </div>
                        </Stack>
                    </div>
                    <div className="cardfooter">
                        <div className="card-penalty">
                            {props.item.task.penalty} p/week penalty
                        </div>
                        <div className="card-status">
                            <div
                                className="card-status-dot"
                                style={{
                                    backgroundColor:
                                        status === Status.COMPLETED
                                            ? "#008768"
                                            : "#ffffa1",
                                    borderColor:
                                        status === Status.COMPLETED
                                            ? DARK_GREY
                                            : LIGHTER_GREY,
                                }}
                            />
                            {status === Status.COMPLETED ? "Completed" : "New"}
                        </div>
                    </div>
                    <div className="card-description">
                        {props.item.task.description.substring(0, 200)} ...
                    </div>
                    <div className="stack">
                        <FormControlLabel
                            className="card-checkbox"
                            control={
                                <Checkbox
                                    size="small"
                                    checked={status === Status.COMPLETED}
                                    onChange={handleChange}
                                    sx={{
                                        color: "#02af8e",
                                        "&.Mui-checked": {
                                            color: "#02af8e",
                                        },
                                    }}
                                />
                            }
                            label="Completed"
                        />
                        <OpenInFullIcon
                            className="card-open"
                            size="small"
                            onClick={() => {
                                setShowPopup(true);
                            }}
                        />
                    </div>
                </div>
            </CardContent>

            <Popup
                open={showPopup}
                setOpen={setShowPopup}
                task={props.item.task}
                status={status}
                subjectcolor={getSubjectColor(props.item.task.subject.id)}
                refreshSlider={props.refreshSlider}
                token={props.token}
                user={props.user}
            />
        </Card>
    );
};
