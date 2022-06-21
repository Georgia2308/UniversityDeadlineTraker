import React, { useEffect, useState } from "react";
import "./AddEditTaskPopup.css";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import { Stack } from "@mui/material";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {
    DARK_GREY,
    DARKER_GREY,
    LIGHTER_GREY,
    getAccentColor,
    RED_ACCENT,
    LIGHT_GREY,
} from "../Utils/Constants";
import AlertDialogError from "../Components/AlertDialogError";
import AlertDialog from "../Components/AlertDialog";
import { TextField } from "@mui/material";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { addTask, editTask, getSubjectsForTeacher } from "../Utils/Services";

const genericProps = {
    required: true,
    variant: "filled",
    className: "textfield",
    sx: {
        width: "50%",
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

const isTaskValid = (task) => {
    return (
        task.title?.length > 0 &&
        task.subtitle?.length > 0 &&
        task.deadline?.length > 0 &&
        Date.parse(task.deadline) > Date.now() &&
        task.penalty?.length > 0 &&
        !isNaN(task.penalty)
    );
};

export default function AddEditTaskPopup(props) {
    const { token, setToken } = props.token ?? "";
    const { user, setUser } = props.user ?? {};
    const [task, setTask] = React.useState(props.task ?? { description: "" });
    const [showError, setShowError] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [subjects, setSubjects] = useState([]);
    const { shouldRefreshSlider, setShouldRefreshSlider } =
        props.refreshSlider ?? false;

    React.useEffect(() => {
        if (!token) return;

        getSubjectsForTeacher(user.id).then((data) => {
            setSubjects(data);
            if (!props.task) setTask({ ...task, subjectId: data[0].id });
        });
    }, [token]);

    const onAddEditTask = () => {
        props.task
            ? editTask({
                  ...task,
                  penalty: Number.parseInt(task.penalty),
              }).then((response) => {
                  setShouldRefreshSlider(!shouldRefreshSlider);
                  setShowConfirm(true);
              })
            : addTask({
                  ...task,
                  penalty: Number.parseInt(task.penalty),
              }).then((response) => {
                  setShouldRefreshSlider(!shouldRefreshSlider);
                  setShowConfirm(true);
              });
    };

    const handleClose = () => {
        props.setOpen(false);
    };

    const getDropdownSubjects = () => {
        return subjects.map((subject) => (
            <MenuItem value={subject.id}>{subject.name}</MenuItem>
        ));
    };

    return (
        <div className="add-edit">
            <Dialog
                open={props.open}
                onClose={handleClose}
                className="add-edit"
            >
                <Stack
                    direction="column"
                    spacing={1}
                    className="add-edit"
                    style={{
                        "background-color": LIGHT_GREY,
                        height: "420px",
                        width: "600px",
                        padding: "30px",
                    }}
                >
                    <Stack direction={"row"} spacing={1}>
                        <Select
                            value={task.subjectId}
                            label="Subject"
                            onChange={(event) => {
                                setTask({
                                    ...task,
                                    subjectId: event.target.value,
                                });
                            }}
                        >
                            {getDropdownSubjects()}
                        </Select>
                        <TextField
                            label="Title"
                            error={task.title === ""}
                            value={task.title}
                            // defaultValue={props.task.title}
                            {...genericProps}
                            onChange={(event) => {
                                setTask({
                                    ...task,
                                    title: event.target.value,
                                });
                            }}
                        />
                    </Stack>
                    <Stack direction={"row"} spacing={1}>
                        <TextField
                            label="Subtitle"
                            error={task.subtitle === ""}
                            value={task.subtitle}
                            // defaultValue={props.task.subtitle}
                            {...genericProps}
                            onChange={(event) => {
                                setTask({
                                    ...task,
                                    subtitle: event.target.value,
                                });
                            }}
                        />
                        <TextField
                            label="Penalty"
                            error={
                                task.penalty === "" ||
                                (task.penalty !== undefined &&
                                    isNaN(task.penalty))
                            }
                            value={task.penalty}
                            // defaultValue={props.penalty}
                            {...genericProps}
                            onChange={(event) => {
                                setTask({
                                    ...task,
                                    penalty: event.target.value,
                                });
                            }}
                        />
                    </Stack>

                    <Stack direction={"row"} spacing={1}>
                        <TextField
                            label="Deadline"
                            error={Date.parse(task.deadline) < Date.now()}
                            type="date"
                            required="false"
                            variant="filled"
                            className="textfield"
                            value={new Date(task.deadline).toLocaleDateString(
                                "en-CA"
                            )}
                            // defaultValue={props.deadline}
                            InputLabelProps={{
                                shrink: true,
                                style: {
                                    color: LIGHTER_GREY,
                                },
                            }}
                            style={{
                                width: "49%",
                                input: {
                                    color: "white",
                                },
                            }}
                            onChange={(event) => {
                                setTask({
                                    ...task,
                                    deadline: event.target.value,
                                });
                            }}
                        />
                    </Stack>
                    <TextareaAutosize
                        area-label="Description"
                        placeholder="  Description"
                        value={task.description}
                        // defaultValue={props.description}
                        {...genericProps}
                        style={{
                            height: 200,
                            backgroundColor: DARK_GREY,
                            color: "white",
                            input: {
                                color: "white",
                            },
                        }}
                        onChange={(event) => {
                            setTask({
                                ...task,
                                description: event.target.value,
                            });
                        }}
                    />
                </Stack>
                <DialogActions
                    style={{
                        "background-color": LIGHT_GREY,
                    }}
                >
                    <Button
                        onClick={onAddEditTask}
                        disabled={!isTaskValid(task)}
                        style={{
                            "background-color": "#878787",
                            border: `2px solid ${getAccentColor()}`,
                            color: DARKER_GREY,
                        }}
                    >
                        {props.button}
                    </Button>
                    <Button
                        onClick={handleClose}
                        style={{
                            "background-color": "#878787",
                            color: DARKER_GREY,
                        }}
                    >
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
            <AlertDialogError
                open={showError}
                setOpen={setShowError}
                label="Please try again"
            />
            <AlertDialog
                open={showConfirm}
                setOpen={setShowConfirm}
                handleClose={handleClose}
                label={
                    props.task
                        ? "Task edited successfully"
                        : "Task added successfully"
                }
            />
        </div>
    );
}
