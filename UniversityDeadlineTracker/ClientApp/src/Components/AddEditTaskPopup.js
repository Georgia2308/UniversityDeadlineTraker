import React, { useEffect, useState } from "react";
import "./AddEditTaskPopup.css";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import { Stack } from "@mui/material";
import {
    DARK_GREY,
    DARKER_GREY,
    LIGHTER_GREY,
    getAccentColor,
    RED_ACCENT,
    LIGHT_GREY,
} from "../Utils/Constants";
import AlertDialogConfirm from "../Components/AlertDialogConfirm";
import AlertDialogError from "../Components/AlertDialogError";
import { TextField } from "@mui/material";
import TextareaAutosize from "@mui/material/TextareaAutosize";

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

export default function Popup(props) {
    const [status, setStatus] = React.useState(props.status);
    const [showConfirmDeleteTask, setShowConfirmDeleteTask] = useState(false);
    const [showError, setShowError] = useState(false);

    const onConfirmDelete = () => {
        // deleteUser(newUser.id).then((response) => {
        //     if (response.status === 200) {
        //         props.setToken(null, null);
        //         props.setUser(null);
        //         history.push(Pages.HOME);
        //     } else setShowError(true);
        // });
        if (true) {
            handleClose();
        } else setShowError(true);
    };

    const handleClose = () => {
        props.setOpen(false);
    };

    const handleChange = (event) => {
        // updateUserTask({
        //     ...props.item,
        //     task: null,
        //     status: event.target.checked ? Status.COMPLETED : Status.NEW,
        // }).then((r) => {});
        // setStatus(event.target.checked ? Status.COMPLETED : Status.NEW);
        // AddNewtaskcard
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
                        <TextField
                            label="Subject"
                            defaultValue={props.subject}
                            // error={newUser.firstName === ""}
                            autofocus
                            {...genericProps}
                            onChange={(event) => {
                                // setNewUser({
                                //     ...newUser,
                                //     firstName: event.target.value,
                                // });
                            }}
                        />
                        <TextField
                            label="Title"
                            // error={newUser.firstName === ""}
                            defaultValue={props.title}
                            autofocus
                            {...genericProps}
                            onChange={(event) => {
                                // setNewUser({
                                //     ...newUser,
                                //     firstName: event.target.value,
                                // });
                            }}
                        />
                    </Stack>
                    <Stack direction={"row"} spacing={1}>
                        <TextField
                            label="Subtitle"
                            // error={newUser.firstName === ""}
                            defaultValue={props.subtitle}
                            autofocus
                            {...genericProps}
                            onChange={(event) => {
                                // setNewUser({
                                //     ...newUser,
                                //     firstName: event.target.value,
                                // });
                            }}
                        />
                        <TextField
                            label="Penalty"
                            // error={
                            //     newUser.code === "" || isNaN(newUser.code)
                            // }
                            defaultValue={props.penalty}
                            autofocus
                            {...genericProps}
                            onChange={(event) => {
                                // setNewUser({
                                //     ...newUser,
                                //     firstName: event.target.value,
                                // });
                            }}
                        />
                    </Stack>

                    <Stack direction={"row"} spacing={1}>
                        <TextField
                            label="Deadline"
                            type="date"
                            required="false"
                            variant="filled"
                            className="textfield"
                            defaultValue={props.deadline}
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
                        />
                    </Stack>
                    <TextareaAutosize
                        area-label="Description"
                        placeholder="  Description"
                        // error={newUser.firstName === ""}
                        defaultValue={props.description}
                        autofocus
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
                            // setNewUser({
                            //     ...newUser,
                            //     firstName: event.target.value,
                            // });
                        }}
                    />
                </Stack>
                <DialogActions
                    style={{
                        "background-color": LIGHT_GREY,
                    }}
                >
                    <Button
                        onClick={handleClose}
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
            <AlertDialogConfirm
                open={showConfirmDeleteTask}
                setOpen={setShowConfirmDeleteTask}
                label="Your task will be deleted"
                onConfirm={onConfirmDelete}
            />
            <AlertDialogError
                open={showError}
                setOpen={setShowError}
                label="Please try again"
            />
        </div>
    );
}
