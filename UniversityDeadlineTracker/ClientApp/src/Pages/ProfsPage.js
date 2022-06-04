import React, { useEffect, useState } from "react";
import "./ProfsPage.css";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Collapse from "@mui/material/Collapse";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import SearchIcon from "@mui/icons-material/Search";
import { Default } from "../Components/Default";
import {
    InputAdornment,
    TablePagination,
    TableSortLabel,
    TextField,
} from "@mui/material";
import { getAllProfs, getSubjectsForTeacher } from "../Utils/Services";
import { LIGHTER_GREY, getAccentColor, LIGHT_GREY } from "../Utils/Constants";

const ProfsPage = (props) => {
    const [profs, setProfs] = useState([]);
    const [filteredProfs, setFilteredProfs] = useState([]);
    const [order, setOrder] = useState("asc");
    const [orderBy, setOrderBy] = useState("Name");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(9);
    const [subjects, setSubjects] = React.useState(null);

    useEffect(() => {
        if (!props.token) return;

        getAllProfs().then((data) => {
            setProfs(data);
            setFilteredProfs(data);
        });
    }, [props.token]);

    const onSearch = (event) => {
        setPage(0);

        if (event.target.value === "") {
            setFilteredProfs(profs);
            return;
        }

        setFilteredProfs(
            profs.filter(
                (a) =>
                    a.username
                        .toLowerCase()
                        .includes(event.target.value.toLowerCase()) ||
                    a.firstName
                        .toLowerCase()
                        .includes(event.target.value.toLowerCase()) ||
                    a.lastName
                        .toLowerCase()
                        .includes(event.target.value.toLowerCase()) ||
                    a.email
                        .toLowerCase()
                        .includes(event.target.value.toLowerCase())
            )
        );
    };

    const descendingComparator = (a, b, orderBy) => {
        orderBy = orderBy.slice(0, 1).toLowerCase() + orderBy.slice(1);
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    };

    const getComparator = (order, orderBy) => {
        return order === "desc"
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    };

    const getHeaderCells = () => {
        const header = ["Arrow", "Username", "FirstName", "LastName", "Email"];
        return header.map((column) => {
            return (
                <TableCell
                    id={column}
                    className="table-head-cell"
                    align="center"
                    sortDirection={orderBy === column ? order : false}
                >
                    <TableSortLabel
                        active={orderBy === column}
                        direction={orderBy === column ? order : "asc"}
                        onClick={() => {
                            const isAsc = orderBy === column && order === "asc";
                            setOrder(isAsc ? "desc" : "asc");
                            setOrderBy(column);
                        }}
                    >
                        {column !== "Arrow" && column}
                    </TableSortLabel>
                </TableCell>
            );
        });
    };

    return (
        <React.Fragment>
            {props.token ? (
                [
                    <div className="table-header">
                        <TextField
                            placeholder="Search.."
                            size="small"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon color="default" />
                                    </InputAdornment>
                                ),
                            }}
                            variant="outlined"
                            onChange={onSearch}
                        />
                    </div>,

                    <TableContainer
                        component={Paper}
                        className="table-container"
                    >
                        <Table sx={{ minWidth: 650 }} className="table">
                            <TableHead className="table-head">
                                {getHeaderCells()}
                            </TableHead>
                            <TableBody className="table-body">
                                {filteredProfs
                                    .sort(getComparator(order, orderBy))
                                    .slice(
                                        page * rowsPerPage,
                                        page * rowsPerPage + rowsPerPage
                                    )
                                    .map((prof) => (
                                        <Row prof={prof} />
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>,

                    <div className="table-footer">
                        <TablePagination
                            component="div"
                            rowsPerPageOptions={[5, 6, 7, 8, 9, 10]}
                            count={filteredProfs.length}
                            page={page}
                            rowsPerPage={rowsPerPage}
                            onPageChange={(event, newPage) => {
                                setPage(newPage);
                            }}
                            onRowsPerPageChange={(event) => {
                                setRowsPerPage(
                                    parseInt(event.target.value, 10)
                                );
                                setPage(0);
                            }}
                        />
                    </div>,
                ]
            ) : (
                <Default />
            )}
        </React.Fragment>
    );
};

export default ProfsPage;

const Row = (props) => {
    const [open, setOpen] = React.useState(false);
    const [subjects, setSubjects] = React.useState([]);

    useEffect(() => {
        getSubjectsForTeacher(props.prof.id).then((data) => setSubjects(data));
    }, [props.prof]);

    const getSubjectLink = (subject) => {
        return (
            <div className="subject-links">
                <span className="subject-link" onClick={() => true}>
                    {subject.name}
                </span>
                <span className="subject-year"> (year {subject.year})</span>
            </div>
        );
    };

    return (
        <React.Fragment>
            <TableRow
                className="table-body-row"
                key={props.prof.username}
                sx={{
                    "&:last-child td, &:last-child th": {
                        border: 0,
                    },
                }}
            >
                <TableCell className="table-body-cell">
                    <div size="small" onClick={() => setOpen(!open)}>
                        {open ? (
                            <KeyboardArrowUpIcon className="arrow" />
                        ) : (
                            <KeyboardArrowDownIcon className="arrow" />
                        )}
                    </div>
                </TableCell>
                <TableCell className="table-body-cell" align="center">
                    {props.prof.username}
                </TableCell>
                <TableCell className="table-body-cell" align="center">
                    {props.prof.firstName}
                </TableCell>
                <TableCell className="table-body-cell" align="center">
                    {props.prof.lastName}
                </TableCell>
                <TableCell className="table-body-cell" align="center">
                    {props.prof.email}
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={6}
                >
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography
                                className="description"
                                variant="h6"
                                gutterBottom
                                component="div"
                            >
                                <div
                                    style={{
                                        fontSize: "16px",
                                        color: LIGHTER_GREY,
                                        marginBottom: "10px",
                                    }}
                                >
                                    Subjects taught by this teacher:
                                </div>
                                {subjects.map(getSubjectLink)}
                            </Typography>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
};
