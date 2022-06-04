import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import { updateUserTask } from "../Utils/Services";
import { Status } from "../Utils/Enums";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Stack } from "@mui/material";
import {
    DARK_GREY,
    DARKER_GREY,
    LIGHTER_GREY,
    getAccentColor,
    LIGHT_GREY,
} from "../Utils/Constants";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

export default function Popup(props) {
    const [status, setStatus] = React.useState(props.status);
    const handleClose = () => {
        props.setOpen(false);
    };

    React.useEffect(() => {
        setStatus(props.status);
    }, [props.status]);

    const handleChange = (event) => {
        updateUserTask({
            ...props.item,
            task: null,
            status: event.target.checked ? Status.COMPLETED : Status.NEW,
        }).then((r) => {});
        setStatus(event.target.checked ? Status.COMPLETED : Status.NEW);
    };

    return (
        <div>
            <Dialog open={props.open} onClose={handleClose}>
                <Card
                    className="popup-card"
                    style={{
                        "background-color": LIGHTER_GREY,
                        width: "500px",
                        height: "300px",
                    }}
                >
                    <CardContent>
                        <div className="card-component">
                            <div
                                className="cardheader"
                                style={{
                                    "background-color": "#b3b3b3",
                                    padding: "20px",
                                    width: "100%",
                                }}
                            >
                                <div
                                    align="left"
                                    className="subject-dot"
                                    style={{
                                        backgroundColor: props.subjectcolor,
                                    }}
                                >
                                    {props.subject}
                                </div>
                                <Stack direction={"row"}>
                                    <div
                                        className="card-titlee"
                                        style={{
                                            fontSize: "24px",
                                            fontWeight: "500",
                                        }}
                                    >
                                        {props.title}
                                    </div>
                                    <div
                                        className="card-subtitle"
                                        style={{
                                            marginLeft: "50px",
                                            fontSize: "30px",
                                            fontWeight: "200",
                                        }}
                                    >
                                        {props.subtitle}
                                    </div>
                                </Stack>
                            </div>
                            <div
                                className="cardfooter"
                                style={{
                                    width: "100%",
                                    marginTop: "30px",
                                }}
                            >
                                <Stack
                                    direction={"column"}
                                    style={{
                                        position: "relative",
                                        height: "176px",
                                    }}
                                >
                                    <div
                                        className="card-description"
                                        style={{
                                            display: "block",
                                            color: DARK_GREY,
                                            fontSize: "13px",
                                        }}
                                    >
                                        {props.description}
                                    </div>
                                    <div
                                        style={{
                                            height: "30px",
                                        }}
                                    >
                                        <span
                                            className="card-penalty"
                                            style={{
                                                fontSize: "16px",
                                                position: "absolute",
                                                left: "0",
                                                bottom: "0",
                                            }}
                                        >
                                            {props.penalty} p/week penalty
                                        </span>
                                        <span
                                            className="card-status"
                                            style={{
                                                fontSize: "16px",
                                                position: "absolute",
                                                right: "0",
                                                bottom: "0",
                                            }}
                                        >
                                            <div
                                                className="card-status-dot"
                                                style={{
                                                    width: "12px",
                                                    height: "12px",
                                                    backgroundColor:
                                                        props.status ===
                                                        Status.COMPLETED
                                                            ? "#008768"
                                                            : "#ffffa1",
                                                    borderColor:
                                                        props.status ===
                                                        Status.COMPLETED
                                                            ? DARK_GREY
                                                            : LIGHTER_GREY,
                                                }}
                                            />
                                            {props.status === Status.COMPLETED
                                                ? "Completed"
                                                : "New"}
                                        </span>
                                    </div>
                                </Stack>
                            </div>
                            <FormControlLabel
                                className="card-checkbox"
                                control={
                                    <Checkbox
                                        size="small"
                                        checked={
                                            props.status === Status.COMPLETED
                                        }
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
                        </div>
                    </CardContent>
                </Card>
                <DialogActions
                    style={{
                        "background-color": LIGHTER_GREY,
                        color: "white",
                    }}
                >
                    <Button
                        onClick={handleClose}
                        autoFocus
                        style={{
                            "background-color": "#878787",
                            color: getAccentColor(),
                        }}
                    >
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}