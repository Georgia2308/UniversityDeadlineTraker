import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { getAccentColor, LIGHT_GREY } from "../Utils/Constants";

export default function AlertDialog(props) {
    const handleClose = () => {
        props.setOpen(false);
        props.handleClose && props.handleClose();
    };

    return (
        <div>
            <Dialog open={props.open} onClose={handleClose}>
                <DialogTitle
                    id="alert-dialog-title"
                    style={{
                        "background-color": LIGHT_GREY,
                        color: "white",
                    }}
                >
                    Operation completed.
                </DialogTitle>
                <DialogContent
                    style={{
                        "background-color": LIGHT_GREY,
                        color: "white",
                    }}
                >
                    <DialogContentText
                        id="alert-dialog-description"
                        style={{
                            "background-color": LIGHT_GREY,
                            color: "white",
                        }}
                    >
                        {props.label}
                    </DialogContentText>
                </DialogContent>
                <DialogActions
                    style={{
                        "background-color": LIGHT_GREY,
                        color: "white",
                    }}
                >
                    <Button
                        onClick={handleClose}
                        autoFocus
                        style={{
                            "background-color": LIGHT_GREY,
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
